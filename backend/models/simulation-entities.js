
const PassengerStatus = {
    WAITING: 0,
    ASSIGNED: 1,
    IN_TRANSIT: 2,
    DROPPED_OFF: 3,
    getKeyByValue: function (value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}

const VehicleStatus = {
    IDLE: 0,
    ASSIGNED: 1,
    MOVING: 2,
    CARRYING_PASSENGER: 3,
    getKeyByValue: function (value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}

const VehicleStrategy = {
    AnyType: 1,
    AnotherType: 2,
    YetAnotherType: 3,
    getKeyByValue: function (value) {
        return Object.keys(this).find(key => this[key] === value);
    }
};

const VehicleOperatingMode = Object.freeze({
    //TODO add modes, check with Mihir. 
})

class Vehicle {
    constructor(data) {
        this.tokenId = data.tokenId;
        this.owner = data.owner;
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.vin = data.vin;
        this.position = {
            longitude: parseFloat(data.location.split(',')[0]),
            latitude: parseFloat(data.location.split(',')[1]),
        };
        this.mileage_km = data.mileage_km;
        this.reputation = data.reputation;
        this.price_usd = data.price_usd;
        this.revenue = data.revenue;
        this.expenses = data.expenses;
        this.data = data.data;
        this.destination = null
        this.status = VehicleStatus.IDLE; // Default status is 'idle'
        this.currentPassenger = null;
    }
    toJSON() {
        return {
            tokenId: this.tokenId,
            owner: this.owner,
            name: this.name,
            description: this.description,
            image: this.image,
            vin: this.vin,
            location: `${this.position.longitude},${this.position.latitude}`,
            mileage_km: this.mileage_km,
            reputation: this.reputation,
            price_usd: this.price_usd,
            expenses: this.expenses,
            revenue: this.revenue,
            data: [this.tokenId, this.mileage_km, this.reputation, this.price_usd, this.expenses, this.revenue]
        };
    }
}

/**
 * as JSON 
 * {
 *     passengerId: 1,
 *     name: 'John Doe',
 *     pickup: {
 *         position: {
 *             latitude: 37.7749,
 *             longitude: -122.4194
 *         }
 *     },
 *     dropoff: {
 *         position: {
 *             latitude: 37.7749,
 *             longitude: -122.4194
 *         }
 *     }
 * }
 */

class Passenger {
    constructor(data) {
        this.passengerId = data.passengerId;
        this.name = data.name;
        this.pickup = data.pickup
        this.dropoff = data.dropoff
        this.status = data.status || PassengerStatus.WAITING; // Default status is 'waiting'
    }
}

module.exports = { Vehicle, Passenger, VehicleStatus, PassengerStatus };