
const PassengerStatus = Object.freeze({
    WAITING: 'waiting',
    ASSIGNED: 'assigned',
    IN_TRANSIT: 'in transit',
    DROPPED_OFF: 'dropped off'
});

const VehicleStatus = Object.freeze({
    ASSIGNED: 'assigned',
    IDLE: 'idle',
    MOVING: 'moving',
    CARRYING_PASSENGER: 'carrying passenger'
});

class Vehicle {
    constructor(data) {
        console.log('Creating vehicle:', data);
        this.tokenId = data.tokenId;
        this.owner = data.owner;
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.vin = data.vin;
        this.position = {
            latitude: parseFloat(data.location.split(',')[0]),
            longitude: parseFloat(data.location.split(',')[1]),
        };
        this.mileage_km = data.mileage_km;
        this.reputation = data.reputation;
        this.price_usd = data.price_usd;
        this.revenue = data.revenue;
        this.expenses = data.expenses;
        this.destination = {
            latitude: data.destinationLatitude ? parseFloat(data.destinationLatitude) : null,
            longitude: data.destinationLongitude ? parseFloat(data.destinationLongitude) : null,
        };
        this.status = VehicleStatus.IDLE; // Default status is 'idle'
        this.currentPassenger = null;
    }

}

class Passenger {
    constructor(data) {
        this.passengerId = data.passengerId;
        this.name = data.name;
        this.pickup = {
            latitude: parseFloat(data.pickup.split(',')[0]),
            longitude: parseFloat(data.location.split(',')[1]),
        };
        this.dropoff = {
            latitude: parseFloat(data.dropoff.split(',')[0]),
            longitude: parseFloat(data.dropoff.split(',')[1]),
        };
        this.status = data.status || PassengerStatus.WAITING; // Default status is 'waiting'
        }
}

module.exports = { Vehicle, Passenger, VehicleStatus, PassengerStatus };