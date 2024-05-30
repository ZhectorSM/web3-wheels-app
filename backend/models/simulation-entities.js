
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

/**
 * min-wait-time
max-passenger
min-expenses
max-revenue
nearby 
 */

const VehicleOperatingMode = {
    MIN_WAIT_TIME: 0,
    MAX_PASSENGER: 1,
    MIN_EXPENSES: 2,
    MAX_REVENUE: 3,
    NEARBY: 4,
}

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
        this.stats = data.stats;
        this.destination = null
        this.status = VehicleStatus.IDLE; // Default status is 'idle'
        this.operationMode = data.operation_mode || VehicleOperatingMode.MIN_WAIT_TIME; // Default strategy is 'min-wait-time'
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
            operation_mode: this.operationMode,
            stats: [this.tokenId, this.mileage_km, this.reputation, this.price_usd, this.expenses, this.revenue]
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

module.exports = { Vehicle, Passenger, VehicleStatus, PassengerStatus, VehicleOperatingMode};