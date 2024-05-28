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
        this.iterationInterval = setInterval(() => {
            this.updateSimulation();
        }, 100); // runs every 1 second

        this.databaseUpdateInterval = setInterval(() => {
            this.updateDatabase()
        }, 1000)
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
        this.findMockDestinationsForVehiclesInIdle()
        this.moveAssignedVehiclesTowardsPickUpLocations()
        this.movePassengerCarryingVehiclesTowardsDropOffLocations()
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
            await aiService.getClosestNodeId(vehicle.tokenId, vehicle.position)
                .then(position => {
                    vehicle.position = position
                })
            this.vehicles.push(vehicle);
            this.updateDatabase()
            return vehicle;
        }
        catch (err) {
            console.error('Error adding vehicle: ', err);
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
            await aiService.getClosestNodeId(passenger.passengerId, passenger.pickup.position)
                .then(pickupPosition => {
                    console.log('pickupPosition', pickupPosition)
                    passenger.pickup = pickupPosition
                })
            await aiService.getClosestNodeId(passenger.passengerId, passenger.dropoff.position)
                .then(dropoffPosition => {
                    console.log('dropoffPosition', dropoffPosition)
                    passenger.dropoff = dropoffPosition
                })
            await aiService.findRoute(passenger.passengerId, passenger.pickup.node_id, passenger.dropoff.node_id)
            await this.calculateTheRidePrice(passenger)
                .then(price => { passenger.ridePrice = price })
            this.passengers.push(passenger);
            return passenger;
        } catch (err) {
            throw err
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
        console.log('passenger', passenger)
        await aiService.calculateDistanceBasedPrice(passenger.passengerId, passenger.pickup.node_id, passenger.dropoff.node_id)
            .then(distance => {
                return (distance * 1.5 * this.calculateFactor()) + 3.0;

            })
    }

    /**
     * Finds mock destinations for vehicles that are in idle status.
     * @returns {Promise<void>} A promise that resolves when the mock destinations are found and assigned to the vehicles.
     */
    async findMockDestinationsForVehiclesInIdle() {
        let idleVehiclesNodeIds = this.vehicles.filter(vehicle => vehicle.status === VehicleStatus.IDLE).map(vehicle => vehicle.position.node_id);
        let idlePassengersNodeIds = this.passengers.filter(passenger => passenger.status === PassengerStatus.IDLE).map(passenger => passenger.pickup.node_id);
        aiService.getMockDestinationsForVehicles(idleVehiclesNodeIds, idlePassengersNodeIds)
            .then(matches => {
                matches.forEach(match => {
                    let vehicle = this.vehicles.find(vehicle => vehicle.position.node_id === match.vehicle_node_id);
                    let passenger = this.passengers.find(passenger => passenger.pickup.node_id === match.destination_node_id);
                    this.assignPassengerToVehicle(passenger, vehicle)

                })
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
        await aiService.findRoute(vehicle.tokenId, vehicle.position.node_id, passenger.pickup.node_id)
            .then(route => {
                vehicle.route = route
                passenger.status = PassengerStatus.ASSIGNED
                vehicle.currentPassenger = passenger;
                vehicle.status = VehicleStatus.ASSIGNED
            })
            .catch(err => console.error('Error finding route for vehicle and passenger: ', err))
    }

    /**
     * Moves assigned vehicles towards pick-up locations.
     * 
     * @returns {Promise<void>} A promise that resolves when all vehicles have been moved.
     */
    async moveAssignedVehiclesTowardsPickUpLocations() {
        let assignedVehicles = this.vehicles.filter(vehicle => vehicle.status === VehicleStatus.ASSIGNED);
        assignedVehicles.forEach(async vehicle => {
            let nextNode = vehicle.route.shift();
            if (!nextNode) {
                vehicle.status = VehicleStatus.CARRYING_PASSENGER;
                vehicle.currentPassenger.status = PassengerStatus.IN_TRANSIT;
                await aiService.findRoute(vehicle.tokenId, vehicle.position.node_id, vehicle.currentPassenger.dropoff.node_id)
                .then(route => {
                    vehicle.route = route
                })
                .catch(err => console.error('Error finding route for vehicle and passenger: ', err))
                return;
            }
            aiService.moveVehicle(vehicle.tokenId, nextNode)
                .then(position => {
                    vehicle.position = position
                    vehicle.mileage_km += 0.1
                    
                })
                .catch(err => console.error('Error moving vehicle: ', err))
        })
    }

    /**
     * Moves the passenger-carrying vehicles towards their drop-off locations.
     * @returns {Promise<void>} A promise that resolves when all vehicles have been moved.
     */
    async movePassengerCarryingVehiclesTowardsDropOffLocations() {
        let carryingPassengerVehicles = this.vehicles.filter(vehicle => vehicle.status === VehicleStatus.CARRYING_PASSENGER);
        carryingPassengerVehicles.forEach(async vehicle => {
            let nextNode = vehicle.route.shift();
            if (!nextNode) {
                vehicle.status = VehicleStatus.IDLE;
                vehicle.currentPassenger.status = PassengerStatus.DROPPED_OFF;
                vehicle.reputation += 1
                vehicle.revenue += vehicle.currentPassenger.ridePrice
                this.passengers.remove(vehicle.currentPassenger)
                vehicle.currentPassenger = null
                return;
            }
            aiService.moveVehicle(vehicle.tokenId, nextNode)
                .then(position => {
                    vehicle.position = position
                    vehicle.mileage_km += 0.1
               
                    
                })
                .catch(err => console.error('Error moving vehicle: ', err))
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