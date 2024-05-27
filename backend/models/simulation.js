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

    async setup() {
        try {

            database.dbReadAllVehicles()
                .then(vehicles => {
                    console.log('Loaded vehicles:', vehicles);
                    this.vehicles = vehicles.map(vehicle => new Vehicle(vehicle));
                });
            aiService.connectAIService()
        } catch (err) {
            console.error('Error setting up Simulation: ', err);
            throw err;
        }
    }

    start() {
        if (!this.isSetUp) {
            throw new Error("Simulation not set up. Please call setup() first.")
        }
        console.log('Simulation started');
        this.iterationInterval = setInterval(() => {
            this.updateSimulation();
        }, 10000); // runs every 1 second

        this.databaseUpdateInterval = setInterval(() => {
            this.updateDatabase()
        }, 1000000)
    }

    updateDatabase(){
        console.log("Updating database ...")
        this.vehicles.forEach(vehicle => {
            database.dbUpdateVehicle
        })
    }

    updateSimulation() {
        console.log('Updating simulation...');
        // Add logic to update the simulation environment here
        // For example, you could update vehicle locations, calculate new mileage, etc.
        this.vehicles.forEach(vehicle => {
            // Example update logic (just for demonstration purposes):
            console.log(`Vehicle ${vehicle.name} at location ${vehicle.position.latitude}, ${vehicle.position.longitude}`);
            // Update vehicle properties here as needed
        });
    }
    clearIntervals() {

    }
    stop() {
        if (this.iterationInterval) {
            clearInterval();
            console.log('Simulation stopped');
        }
    }

    async addVehicle(data) {
        const vehicle = new Vehicle(data);
        await aiService.getClosestNodeId(vehicle.vehicleId, vehicle.position)
            .then(position => {
                vehicle.position = position
            })
        this.vehicles.push(vehicle);
        return vehicle;
    }

    async addPassenger(data) {
        const passenger = new Passenger(data);
        await aiService.getClosestNodeId(passenger.passengerId, passenger.pickup)
            .then(pickupPosition => {
                passenger.pickup = position
            })
        await aiService.getClosestNodeId(passenger.passengerId, passenger.dropoff)
            .then(dropoffPosition => {
                passenger.dropoff = dropoffPosition
            })
        await this.calculateTheRidePrice(passenge.passengerId)
            .then(price => passenger.ridePrice = price )
        this.passengers.push(passenger);
        return passenger;
    }

    calculateFactor = (vehicles, passengers) {
        let availableVehicles = vehicles.filter(vehicle => vehicle.status === VehicleStatus.IDLE).length;
        let waitingPassengers = passengers.length; // Assuming all passengers are waiting
    
        // Calculate the factor based on the number of available vehicles and passengers
        // If there are more passengers than vehicles, the factor will be greater than 1, increasing the ride distance
        // If there are more vehicles than passengers, the factor will be less than 1, decreasing the ride distance
        let factor = waitingPassengers / (availableVehicles || 1);
    
        return factor;
    }

    async calculateTheRidePrice(passengerId){
        const passenger = this.passengers.find(p => p.passengerId === passengerId);
        await aiService.calculateDistanceBasedPrice()
        const price = distance * 1.5 * this.calculateFactor();
        return price;
    }

    async actionDropOffPassenger(vehicleId) {
        const vehicle = this.vehicles.find(v => v.tokenId === vehicleId);
        if (this.canDropOff(vehicleId)) {
            this.dropOffPassenger(vehicleId);

        }
    }

    async actionAssignPassenger(vehicleId, passengerId) {
        if (this.canAssignPassenger(vehicleId, passengerId)) {
            this.assignPassenger(vehicleId, passengerId);
        }
    }

    async actionPickUpPassenger(vehicleId) {
        if (this.canPickUpPassenger(vehicleId)) {
            this.pickUpPassenger(vehicleId);
        }
    }

    canAssignPassenger(vehicleId, passengerId) {
        const vehicle = this.vehicles.find(v => v.tokenId === vehicleId);
        const passenger = this.passengers.find(p => p.passengerId === passengerId);
        if (vehicle && passenger && vehicle.status === VehicleStatus.IDLE && passenger.status === PassengerStatus.WAITING) {
            console.log(`Vehicle ${vehicle.name} can be assigned passenger ${passenger.name}`);
            return true;
        } else {
            console.log('Vehicle cannot be assigned passenger');
            return false;
        }
    }

    dropOffPassenger(vehicleId) {
        const vehicle = this.vehicles.find(v => v.tokenId === vehicleId);
        const passenger = this.passengers.find(p => p.passengerId === vehicle.currentPassenger.passengerId);
        vehicle.status = VehicleStatus.IDLE;
        vehicle.currentPassenger.status = PassengerStatus.DROPPED_OFF;
        vehicle.currentPassenger = null;
        vehicle.destination = null;
        this.passengers.remove(passenger);
        //TODO update the money after ride is ended
        console.log(`Vehicle ${vehicle.name} has dropped off passenger ${passenger.name}`);
    }
    assignPassenger(vehicleId, passengerId) {
        const vehicle = this.vehicles.find(v => v.tokenId === vehicleId);
        const passenger = this.passengers.find(p => p.passengerId === passengerId);
        vehicle.status = VehicleStatus.ASSIGNED;
        vehicle.currentPassenger = passenger;
        passenger.status = PassengerStatus.ASSIGNED;
        vehicle.destination = passenger.pickup;

    }

    canDropOff(vehicleId) {
        const vehicle = this.vehicles.find(v => v.tokenId === vehicleId);
        if (vehicle &&
            vehicle.passenger &&
            vehicle.status === VehicleStatus.CARRYING_PASSENGER &&
            vehicle.currentPassenger.status === PassengerStatus.IN_TRANSIT &&
            vehicle.destination.latitude === vehicle.position.latitude &&
            vehicle.destination.longitude === vehicle.position.longitude) {

            return true;
        }
        console.log('Vehicle cannot drop off passenger');
        return false;
    }

    canPickUpPassenger(vehicleId) {
        const vehicle = this.vehicles.find(v => v.tokenId === vehicleId);
        if (vehicle &&
            vehicle.currentPassenger &&
            vehicle.status === VehicleStatus.ASSIGNED &&
            vehicle.currentPassenger.status === PassengerStatus.ASSIGNED &&
            vehicle.currentPassenger.pickup.latitude === vehicle.position.latitude &&
            vehicle.currentPassenger.pickup.longitude === vehicle.position.longitude) {
            console.log(`Vehicle ${vehicle.name} can pick up passenger ${vehicle.currentPassenger.name}`);
            return true;
        } else {
            console.log('Vehicle cannot pick up passenger');
            return false;
        }
    }

    pickUpPassenger(vehicleId) {
        const vehicle = this.vehicles.find(v => v.tokenId === vehicleId);
        const passenger = this.passengers.find(p => p.passengerId === vehicle.currentPassenger.passengerId);
        vehicle.status = VehicleStatus.CARRYING_PASSENGER;
        vehicle.currentPassenger.status = PassengerStatus.IN_TRANSIT;
        vehicle.destination = vehicle.currentPassenger.dropoff;
    }
}

const simulation = new Simulation();

module.exports = { simulation };