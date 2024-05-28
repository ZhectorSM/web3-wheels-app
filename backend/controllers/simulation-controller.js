const simulation = require('../models/simulation')
const { Vehicle, Passenger, VehicleStatus, PassengerStatus } = require('../models/simulation-entities')

/**
 * POST localhost:5000/sim/vehicles
 * 
 * This endpoint creates a new vehicle in the simulation.
 * The details of the new vehicle are provided in the request body.
 * 
 * @example 
 * Request: POST localhost:5000/sim/vehicles
 * Request Body:
 * {
    "tokenId": 4,
    "owner": "NftCar4",
    "name": "Mircidis",
    "description": "Autonomous vehicle",
    "image": "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N",
    "vin": "LM4AC113061sdas105688",
    "location": "-73123.995018,40.73312986",
    "mileage_km": 60000,
    "reputation": 5,
    "price_usd": 40000,
    "expenses": 40,
    "revenue": 100,
    "data": [
        0,
        60000,
        5,
        40000,
        40,
        100
    ]
}
 * Response:
{
    "message": "Vehicle has been created successfully.",
    "vehicle": {
        "tokenId": 4,
        "owner": "NftCar4",
        "name": "Mircidis",
        "description": "Autonomous vehicle",
        "image": "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N",
        "vin": "LM4AC113061sdas105688",
        "location": "-73.9739026,40.7571447",
        "mileage_km": 60000,
        "reputation": 5,
        "price_usd": 40000,
        "expenses": 40,
        "revenue": 100,
        "data": [
            4,
            60000,
            5,
            40000,
            40,
            100
        ]
    }
}
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The body of the request.
 * @param {number} req.body.tokenId - The unique identifier of the vehicle.
 * @param {string} req.body.owner - The owner of the vehicle.
 * @param {string} req.body.name - The name of the vehicle.
 * @param {string} req.body.description - A description of the vehicle.
 * @param {string} req.body.image - A URL to an image of the vehicle.
 * @param {string} req.body.vin - The Vehicle Identification Number of the vehicle.
 * @param {string} req.body.location - The current location of the vehicle, represented as a string of the format "longitude,latitude".
 * @param {number} req.body.mileage_km - The mileage of the vehicle in kilometers.
 * @param {number} req.body.reputation - The reputation score of the vehicle.
 * @param {number} req.body.price_usd - The price of the vehicle in USD.
 * @param {number} req.body.expenses - The expenses of the vehicle.
 * @param {number} req.body.revenue - The revenue of the vehicle.
 * @param {number[]} req.body.data - An array of data related to the vehicle.
 * 
 * @param {Object} res - The Express response object.
 * 
 * @returns {Object} - An object containing a message and the details of the created vehicle.
 */
const addVehicle = (req, res) => {
    const vehicleData = req.body
    const id = vehicleData.tokenId
    console.log(vehicleData)
    simulation.addVehicle(vehicleData)
        .then((vehicle) => {
            res.status(201).json({ message: 'Vehicle has been created successfully.', vehicle: vehicle })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
}
//TODO check
const addPassenger = (req, res) => {
    const passengerData = req.body
    simulation.addPassenger(passengerData)
        .then((passenger) => {
            res.status(201).json({ message: 'Passenger has been created successfully.', passenger: passenger })
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
}

/**
 * GET localhost:5000/vehicles
 * 
 * This endpoint returns the current position and other details of all vehicles in the simulation.
 * 
 * @returns {Array} An array of objects, each representing a vehicle. Each vehicle object has the following properties:
 * - vehicleId: The unique identifier of the vehicle.
 * - name: The name of the vehicle.
 * - reputation: The reputation score of the vehicle.
 * - vin: The Vehicle Identification Number.
 * - position: An object containing the current longitude and latitude of the vehicle.
 * 
 * @example
 * // Response example
 * [
 *     {
 *         "vehicleId": 0,
 *         "name": "Thesla",
 *         "reputation": 5,
 *         "vin": "LM4AC113061105688",
 *         "position": {
 *             "longitude": -73.995018,
 *             "latitude": 40.73986
 *         }
 *     },
 *     {
 *         "vehicleId": 1,
 *         "name": "Audio",
 *         "reputation": 6,
 *         "vin": "WAUKEAFM8DA033285",
 *         "position": {
 *             "longitude": -73.9746686,
 *             "latitude": 40.7395275
 *         }
 *     },
 *     {
 *         "vehicleId": 2,
 *         "name": "BeMeWe",
 *         "reputation": 7,
 *         "vin": "WAUKEAFM8DA033285",
 *         "position": {
 *             "longitude": -73.9746686,
 *             "latitude": 40.7395275
 *         }
 *     }
 * ]
 * 
 * @param {*} req The request object.
 * @param {*} res The response object.
 */
const getVehiclesPosition = (req, res) => {
    try {
        let vehicles = simulation.vehicles.map(vehicle => ({
            vehicleId: vehicle.tokenId,
            name: vehicle.name,
            reputation: vehicle.reputation,
            vin: vehicle.vin,
            position: {
                longitude: vehicle.position.longitude,
                latitude: vehicle.position.latitude
            }
        }));
        res.status(200).json(vehicles)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
/**
 * GET localhost:5000/sim/vehicles/:id
 * 
 * This endpoint retrieves the details of a specific vehicle in the simulation.
 * The vehicle is identified by the `id` provided in the request parameters.
 * 
 * @example 
 * Request: GET localhost:5000/sim/vehicles/1
 * Response:
 * [
    {
        "vehicleId": 1,
        "name": "Audio",
        "reputation": 6,
        "vin": "WAUKEAFM8DA033285",
        "position": {
            "node_id": 11543660372,
            "longitude": -73.9746686,
            "latitude": 40.7395275
        }
    }
]
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The parameters of the request.
 * @param {string} req.params.id - The ID of the vehicle to retrieve.
 * 
 * @param {Object} res - The Express response object.
 * 
 * @returns {Object[]} - An array containing the details of the requested vehicle.
 * Each object in the array includes the following properties:
 * - `vehicleId`: The unique identifier of the vehicle.
 * - `name`: The name of the vehicle.
 * - `reputation`: The reputation score of the vehicle.
 * - `vin`: The Vehicle Identification Number of the vehicle.
 * - `position`: An object containing the current position of the vehicle, represented as a `node_id`, `longitude`, and `latitude`.
 */
const getVehiclePosition = (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        console.log(simulation.vehicles)
        let vehicle = simulation.vehicles
            .filter(vehicle => vehicle.tokenId == id)
            .map(vehicle => ({
                vehicleId: vehicle.tokenId,
                name: vehicle.name,
                reputation: vehicle.reputation,
                vin: vehicle.vin,
                position: vehicle.position
            }));
        console.log("vehicle", vehicle)
        res.status(200).json(vehicle)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getPassengerPositions = (req, res) => {
    try {
        let passengers = simulation.passengers.map(passenger => ({
            passengerId: passenger.passengerId,
            name: passenger.name,
            position: passenger.status === PassengerStatus.IN_TRANSIT ? passenger.dropoff.position : passenger.pickup.position
        }));
        res.status(200).json(passengers)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const getPassengerPosition = (req, res) => {
    const { id } = req.params;
    try {
        let passenger = simulation.passengers
            .find(passenger => passenger.id === id)
            .map(passenger => ({
                passengerId: passenger.passengerId,
                name: passenger.name,
                position: passenger.status === PassengerStatus.IN_TRANSIT ? passenger.dropoff.position : passenger.pickup.position
            }));
        res.status(200).json(passenger)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
/**
 * GET localhost:5000/sim/
 * 
 * This endpoint returns the current state of the simulation, including the details of all vehicles and passengers.
 * 
 * @returns {Object} An object containing two properties: 'vehicles' and 'passengers'.
 * 
 * 'vehicles' is an array of objects, each representing a vehicle. Each vehicle object has the following properties:
 * - tokenId: The unique identifier of the vehicle.
 * - owner: The owner of the vehicle.
 * - name: The name of the vehicle.
 * - description: A description of the vehicle.
 * - image: A URL to an image of the vehicle.
 * - vin: The Vehicle Identification Number.
 * - location: The current location of the vehicle, represented as a string of the format 'longitude,latitude'.
 * - mileage_km: The total mileage of the vehicle, in kilometers.
 * - reputation: The reputation score of the vehicle.
 * - price_usd: The price of the vehicle, in USD.
 * - expenses: The total expenses of the vehicle.
 * - revenue: The total revenue generated by the vehicle.
 * - data: An array containing the tokenId, mileage_km, reputation, price_usd, expenses, and revenue of the vehicle.
 * 
 * 'passengers' is an array of objects, each representing a passenger. This array is empty in the example response, but each passenger object would have properties similar to the vehicle objects.
 * 
/**
 * @example
 * {
 *   "vehicles": [
 *     {
 *       "tokenId": 1,
 *       "owner": "John Doe",
 *       "name": "Car",
 *       "description": "A car",
 *       "image": "https://example.com/car.jpg",
 *       "vin": "1234567890",
 *       "location": "37.7749,-122.4194",
 *       "mileage_km": 10000,
 *       "reputation": 5,
 *       "price_usd": 20000,
 *       "expenses": 5000,
 *       "revenue": 10000,
 *       "data": [1, 10000, 5, 20000, 5000, 10000]
 *     },
 *      ...
 *   ],
 *   "passengers": []
 * }
 *
 * @param {*} req The request object.
 * @param {*} res The response object.
 */
const getSimInfo = (_, res) => {
    //console.log(simulation.getSimInfo())
    res.status(200).json(simulation.getSimInfo())
}



module.exports = { addVehicle, addPassenger, getVehiclesPosition, getSimInfo, getVehiclePosition, getPassengerPositions, getPassengerPosition }