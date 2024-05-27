
const PassengerStatus = {
    WAITING: 0,
    ASSIGNED: 1,
    IN_TRANSIT: 2,
    DROPPED_OFF: 3,
    getKeyByValue: function(value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}

const VehicleStatus = {
    ASSIGNED: 0,
    IDLE: 1,
    MOVING: 2,
    CARRYING_PASSENGER: 3,
    getKeyByValue: function(value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}

const VehicleStrategy = {
    AnyType: 1,
    AnotherType: 2,
    YetAnotherType: 3,
    getKeyByValue: function(value) {
        return Object.keys(this).find(key => this[key] === value);
    }
};

const VehicleOperatingMode = Object.freeze({
    //TODO add modes, check with Mihir. 
})

class Vehicle {
    constructor(data) {
        //console.log('Creating vehicle:', data);
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
        this.destination = null
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