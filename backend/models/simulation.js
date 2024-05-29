const { Vehicle, Passenger, VehicleStatus, PassengerStatus } = require('./simulation-entities')
const database = require('../database/database')
const aiService = require('../services/ai-service')

class Simulation {
    constructor() {
        this.vehicles = []
        this.passengers = []
        this.isSetUp = false
        this.iterationInterval = null
        this.databaseUpdateInterval = null
        this.graph = null
    }

    /**
     * Sets up the simulation by connecting to the AI service, reading all vehicles from the database,
     * and adding them to the simulation.
     * @throws {Error} If there is an error setting up the simulation.
     */
    async setup() {
        try {
            await aiService.connectAIService()
            await database.dbReadAllVehicles()
                .then(vehicles => {
                    vehicles.forEach(vehicle =>
                        this.addVehicle(vehicle)
                            .catch(err => console.error('Error adding vehicle: ', err)))
                });
            this.isSetUp = true
        } catch (err) {
            console.error('Error setting up Simulation: ', err);
            throw err;
        }
    }

    /**
     * Starts the simulation.
     * @throws {Error} If the simulation is not set up. Call setup() first.
     */
    start() {
        if (!this.isSetUp) {
            throw new Error("Simulation not set up. Please call setup() first.")
        }
        console.log('Simulation started');
        //this run every 1 second, update the simulation environment
        this.iterationInterval = setInterval(() => {
            this.updateSimulation();
        }, 1000); // runs every 1 second

        this.databaseUpdateInterval = setInterval(() => {
            this.updateDatabase()
        }, 2000) // runs every 1 minute
    }

    /**
     * Updates the database with the current state of the vehicles.
     * @returns {Promise<void>} A promise that resolves when the database update is complete.
     */
    async updateDatabase() {
        console.log("Updating database ...")
        this.vehicles.forEach(vehicle => {
            database.dbUpdateVehicle(vehicle.tokenId, vehicle)
                .catch(err => console.error('Error updating vehicle in database: ', err))

        })
    }


    /**
     * Updates the simulation environment.
     * This method is responsible for updating the simulation environment, such as vehicle locations, mileage, etc.
     * It performs the following steps:
     * 1. Finds mock destinations for vehicles in idle.
     * 2. Moves assigned vehicles towards pick-up locations.
     * 3. Moves passenger-carrying vehicles towards drop-off locations.
     */
    async updateSimulation() {
        console.log('Updating simulation...');
        // Add logic to update the simulation environment here
        // For example, you could update vehicle locations, calculate new mileage, etc.
        
        this.movePassengerCarryingVehiclesTowardsDropOffLocations()
        this.moveAssignedVehiclesTowardsPickUpLocations()
        this.findMockDestinationsForVehiclesInIdle()
    }

    /**
     * Stops the simulation by clearing the iteration and database update intervals.
     * @returns {void}
     */
    stop() {
        clearInterval(this.iterationInterval);
        clearInterval(this.databaseUpdateInterval);
        console.log('Simulation stopped');
    }

    /**
     * Adds a new vehicle to the simulation.
     * @param {Object} data - The data of the vehicle to be added.
     * @param {number} data.tokenId - The token ID of the vehicle.
     * @param {Object} data.position - The position of the vehicle.
     * @returns {Promise<Vehicle>} - A promise that resolves with the added vehicle.
     * @throws {Error} - If the vehicle's tokenId is missing or already exists.
     */
    async addVehicle(data) {
        try {
            if (!data.tokenId && data.tokenId !== 0) throw new Error('Vehicle tokenId is required')
            if (this.vehicles.find(vehicle => vehicle.tokenId === data.tokenId)) throw new Error('Vehicle already exists')
            const vehicle = new Vehicle(data);
            console.log(`Adding vehicle ${vehicle.tokenId}.`);
            await aiService.getClosestNodeId(vehicle.tokenId, vehicle.position)
                .then(position => {
                    console.log(`Found position for vehicle ${vehicle.tokenId}: ${position}.`);
                    vehicle.position = position
                })
            this.vehicles.push(vehicle);
            console.log(`Added vehicle ${vehicle.tokenId}.`);
            this.updateDatabase()
            return vehicle;
        }
        catch (err) {
            console.error('Error adding vehicle: ', err);
            console.log(`Failed to add vehicle ${data.tokenId}.`);
            throw err
        }
    }

    /**
     * Adds a new passenger to the simulation.
     * 
     * @param {Object} data - The data of the passenger to be added.
     * @returns {Promise<Object>} - A promise that resolves to the added passenger.
     * @throws {Error} - If there is an error while adding the passenger.
     */
    async addPassenger(data) {
        try {
            const passenger = new Passenger(data);
            console.log(`Adding passenger ${passenger.passengerId}.`);
            await aiService.getClosestNodeId(passenger.passengerId, passenger.pickup.position)
                .then(pickupPosition => {
                    console.log(`Found pickup position for passenger ${passenger.passengerId}: ${pickupPosition}.`);
                    passenger.pickup.position = pickupPosition;
                })
            await aiService.getClosestNodeId(passenger.passengerId, passenger.dropoff.position)
                .then(dropoffPosition => {
                    console.log(`Found dropoff position for passenger ${passenger.passengerId}: ${dropoffPosition}.`);
                    passenger.dropoff.position = dropoffPosition;
                })
            await aiService.findRoute(passenger.passengerId, passenger.pickup.position.node_id, passenger.dropoff.position.node_id)
                .then(route => {
                    console.log(`Found route for passenger ${passenger.passengerId}.`);
                })
            await this.calculateTheRidePrice(passenger)
                .then(price => {
                    console.log(`Calculated ride price for passenger ${passenger.passengerId}: ${price}.`);
                    passenger.ridePrice = price;
                    console.log(`Ride price ${passenger.ridePrice}.`);
                })
            this.passengers.push(passenger);
            console.log(`Added passenger ${passenger.passengerId}.`);
            console.log('passenger', passenger)
            return passenger;
        } catch (err) {
            console.error('Error adding passenger: ', err);
            throw err;
        }
    }

    /**
     * Calculates the factor based on the number of available vehicles and passengers.
     * If there are more passengers than vehicles, the factor will be greater than 1, increasing the ride distance.
     * If there are more vehicles than passengers, the factor will be less than 1, decreasing the ride distance.
     * 
     * @returns {number} The calculated factor.
     */
    calculateFactor() {
        let availableVehicles = this.vehicles.filter(vehicle => vehicle.status === VehicleStatus.IDLE).length;
        let waitingPassengers = this.passengers.filter(passenger => passenger.status === PassengerStatus.IDLE).length; // Assuming all passengers are waiting

        // Calculate the factor based on the number of available vehicles and passengers
        // If there are more passengers than vehicles, the factor will be greater than 1, increasing the ride distance
        // If there are more vehicles than passengers, the factor will be less than 1, decreasing the ride distance
        let factor = waitingPassengers / (availableVehicles || 1);

        return factor;
    }

    /**
     * Calculates the price of a ride for a given passenger.
     * @param {Object} passenger - The passenger object containing passengerId, pickup, and dropoff information.
     * @returns {Promise<number>} The calculated ride price.
     */
    async calculateTheRidePrice(passenger) {
        let price = 3.0
        await aiService.calculateDistanceBasedPrice(passenger.passengerId, passenger.pickup.position.node_id, passenger.dropoff.position.node_id)
            .then(distance => {
                price += (distance * 1.5 * this.calculateFactor()) 

            })
        return price
    }

    /**
     * Finds mock destinations for vehicles that are in idle status.
     * @returns {Promise<void>} A promise that resolves when the mock destinations are found and assigned to the vehicles.
     */
    async findMockDestinationsForVehiclesInIdle() {
        let idleVehiclesNodeIds = this.vehicles.filter(vehicle => vehicle.status === VehicleStatus.IDLE).map(vehicle => vehicle.position.node_id);
        let idlePassengersNodeIds = this.passengers.filter(passenger => passenger.status === PassengerStatus.WAITING).map(passenger => passenger.pickup.position.node_id);
        console.log(`Found ${idleVehiclesNodeIds.length} idle vehicles and ${idlePassengersNodeIds.length} idle passengers.`);
        if (idleVehiclesNodeIds.length === 0 || idlePassengersNodeIds.length === 0) return;
        aiService.getMockDestinationsForVehicles(idleVehiclesNodeIds, idlePassengersNodeIds)
            .then(matches => {
                console.log(`Found ${matches.length} matches for idle vehicles and passengers.`);
                matches.forEach(match => {
                    let vehicle = this.vehicles.find(vehicle => vehicle.position.node_id === match.vehicle_node_id);
                    let passenger = this.passengers.find(passenger => passenger.pickup.position.node_id === match.destination_node_id);
                    console.log(`Assigning passenger from node ${passenger.pickup.position.node_id} to vehicle at node ${vehicle.position.node_id}.`);
                    this.assignPassengerToVehicle(passenger, vehicle)
                })
            })
            .catch(err => {
                console.error('Error getting mock destinations for vehicles: ', err);
                console.log(`Failed to get mock destinations for idle vehicles.`);
            })  
    }

    /**
     * Assigns a passenger to a vehicle and finds the route for the vehicle to pick up the passenger.
     * 
     * @param {Passenger} passenger - The passenger to be assigned to the vehicle.
     * @param {Vehicle} vehicle - The vehicle to assign the passenger to.
     * @returns {Promise<void>} - A promise that resolves when the passenger is assigned to the vehicle and the route is found.
     */
    async assignPassengerToVehicle(passenger, vehicle) {
        console.log(`Assigning passenger ${passenger.passengerId} to vehicle ${vehicle.tokenId}.`);
        await aiService.findRoute(vehicle.tokenId, vehicle.position.node_id, passenger.pickup.position.node_id)
            .then(data => {
                console.log(`Found route for vehicle ${vehicle.tokenId} and passenger ${passenger.passengerId} : ${data.route}.`);
                vehicle.route = data.route; 
                passenger.status = PassengerStatus.ASSIGNED;
                vehicle.currentPassenger = passenger;
                vehicle.status = VehicleStatus.ASSIGNED;
                console.log(`Passenger ${passenger.passengerId} assigned to vehicle ${vehicle.tokenId}.`);
            })
            .catch(err => {
                console.error('Error finding route for vehicle and passenger: ', err);
                console.log(`Failed to find route for vehicle ${vehicle.tokenId} and passenger ${passenger.passengerId}.`);
            })
    }
    /**
     * Moves assigned vehicles towards pick-up locations.
     * 
     * @returns {Promise<void>} A promise that resolves when all vehicles have been moved.
     */
    async moveAssignedVehiclesTowardsPickUpLocations() {
        let assignedVehicles = this.vehicles.filter(vehicle => vehicle.status === VehicleStatus.ASSIGNED);
        console.log(`Starting to move ${assignedVehicles.length} assigned vehicles.`);
        assignedVehicles.forEach(async vehicle => {
            console.log("Vehicle position", vehicle.position.node_id)
            console.log("Vehicle route", vehicle.route)
            let nextNode = vehicle.route.shift();
            console.log("Next node", nextNode)
            if (!nextNode) {
                console.log(`Vehicle ${vehicle.tokenId} has reached the pickup location.`);
                vehicle.status = VehicleStatus.CARRYING_PASSENGER;
                vehicle.currentPassenger.status = PassengerStatus.IN_TRANSIT;
                console.log(`Picking up passenger ${vehicle.currentPassenger.passengerId}.`);
                await aiService.findRoute(vehicle.tokenId, vehicle.position.node_id, vehicle.currentPassenger.dropoff.position.node_id)
                    .then(data => {
                        console.log(`Found route for vehicle ${vehicle.tokenId} and passenger to dropoff location : ${data.route}.`);
                        vehicle.route = data.route
                    })
                    .catch(err => {
                        console.error('Error finding route for vehicle and passenger: ', err);
                        console.log(`Failed to find route for vehicle ${vehicle.tokenId} and passenger.`);
                    })
                return;
            }
            console.log(`Moving vehicle ${vehicle.tokenId} to next node ${nextNode}.`);
            aiService.moveVehicle(vehicle.tokenId, nextNode)
                .then(data => {
                    console.log(`Vehicle ${vehicle.tokenId} moved to position ${data.position}.`);
                    vehicle.position = data.position
                    console.log(`Vehicle ${vehicle.tokenId} moved to position ${vehicle.position}.`);

                    vehicle.mileage_km += 0.1
                })
                .catch(err => {
                    console.error('Error moving vehicle in assignned vehicle: ', err);
                    console.log(`Failed to move vehicle ${vehicle.tokenId}.`);
                })
        })
    }

    /**
     * Moves the passenger-carrying vehicles towards their drop-off locations.
     * @returns {Promise<void>} A promise that resolves when all vehicles have been moved.
     */
    async movePassengerCarryingVehiclesTowardsDropOffLocations() {
        let carryingPassengerVehicles = this.vehicles.filter(vehicle => vehicle.status === VehicleStatus.CARRYING_PASSENGER);
        console.log(`Starting to move ${carryingPassengerVehicles.length} passenger-carrying vehicles.`);
        carryingPassengerVehicles.forEach(async vehicle => {
            let nextNode = vehicle.route.shift();
            if (!nextNode) {
                console.log(`Vehicle ${vehicle.tokenId} has reached dropoff location.`);
                console.log(`Dropping off passenger ${vehicle.currentPassenger.passengerId}.`);
                vehicle.status = VehicleStatus.IDLE;
                vehicle.currentPassenger.status = PassengerStatus.DROPPED_OFF;
                vehicle.reputation += 1
                vehicle.revenue += vehicle.currentPassenger.ridePrice
                vehicle.currentPassenger = null
                this.passengers = this.passengers.filter(passenger => passenger.status !== PassengerStatus.DROPPED_OFF);
                return;
            }
            console.log(`Moving vehicle ${vehicle.tokenId} to next node.`);
            aiService.moveVehicle(vehicle.tokenId, nextNode)
                .then(data => {
                    console.log(`Vehicle ${vehicle.tokenId} moved to position ${data.position}.`);
                    vehicle.position = data.position
                    vehicle.mileage_km += 0.1
                })
                .catch(err => {
                    console.error('Error moving vehicle: ', err);
                    console.log(`Failed to move vehicle ${vehicle.tokenId}.`);
                })
        })
    }
    getSimInfo() {
        return {
            vehicles: this.vehicles,
            passengers: this.passengers
        }
    }

}

const simulation = new Simulation();

module.exports = simulation