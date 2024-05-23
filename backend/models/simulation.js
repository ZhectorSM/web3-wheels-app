const { Vehicle, Passenger, VehicleStatus, PassengerStatus } = require('./simulation-entities')
const database = require('../database/database')

class Simulation {
    constructor() {
        this.vehicles = []
        this.passengers = []
        this.isSetUp = false
        this.interval = null
        this.graph = null
    }

    async setup() {
        try {

            await database.dbReadAllVehicles()
                .then(vehicles => {
                    console.log('Loaded vehicles:', vehicles);
                    this.vehicles = vehicles.map(vehicle => new Vehicle(vehicle));
                });
        } catch (err) {
            console.error('Error connecting to the database or loading data', err);
            throw err;
        }
    }

    start() {
        if (!this.isSetUp) {
            throw new Error("Simulation not set up. Please call setup() first.")
        }
        console.log('Simulation started');
        this.interval = setInterval(() => {
            this.update();
        }, 10000); // runs every 1 second
    }

    update() {
        console.log('Updating simulation...');
        // Add logic to update the simulation environment here
        // For example, you could update vehicle locations, calculate new mileage, etc.
        this.vehicles.forEach(vehicle => {
            // Example update logic (just for demonstration purposes):
            console.log(`Vehicle ${vehicle.name} at location ${vehicle.position.latitude}, ${vehicle.position.longitude}`);
            // Update vehicle properties here as needed
        });
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            console.log('Simulation stopped');
        }
    }

    async addVehicle(data) {
        const vehicle = new Vehicle(data);
        this.vehicles.push(vehicle);
        return vehicle;
    }

    async addPassenger(data) {
        const passenger = new Passenger(data);
        this.passengers.push(passenger);
        return passenger;
    }


    async calculateTheRidePrice(passengerId){
        const passenger = this.passengers.find(p => p.passengerId === passengerId);
        const distance = this.calculateDistance(passenger.pickup, passenger.dropoff);
        const price = distance * 1.5;
        return price;
    }

    calculateDistance(pickupPos, dropoffPos) {
        
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