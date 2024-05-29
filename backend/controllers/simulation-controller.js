const simulation = require('../models/simulation')
const { Vehicle, Passenger, VehicleStatus, PassengerStatus } = require('../models/simulation-entities')

/**
 * @api {post} localhost:5000/sim/vehicles Add New Vehicle
 * @apiName AddNewVehicle
 * @apiGroup Simulation
 * 
 * @apiDescription This endpoint is used to add a new vehicle to the simulation.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "tokenId": 4,
 *    "owner": "NftCar4",
 *    "name": "Mircidis",
 *    "description": "Autonomous vehicle",
 *    "image": "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N",
 *    "vin": "LM4AC113061sdas105688",
 *    "location": "-73123.995018,40.73312986",
 *    "mileage_km": 60000,
 *    "reputation": 5,
 *    "price_usd": 40000,
 *    "expenses": 40,
 *    "revenue": 100,
 *    "data": [
 *        0,
 *        60000,
 *        5,
 *        40000,
 *        40,
 *        100
 *    ]
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "message": "Vehicle has been created successfully.",
 *    "vehicle": {
 *        "tokenId": 4,
 *        "owner": "NftCar4",
 *        "name": "Mircidis",
 *        "description": "Autonomous vehicle",
 *        "image": "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N",
 *        "vin": "LM4AC113061sdas105688",
 *        "location": "-73.9739026,40.7571447",
 *        "mileage_km": 60000,
 *        "reputation": 5,
 *        "price_usd": 40000,
 *        "expenses": 40,
 *        "revenue": 100,
 *        "data": [
 *            4,
 *            60000,
 *            5,
 *            40000,
 *            40,
 *            100
 *        ]
 *    }
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error message"
 *     }
 * 
 * @param {*} req 
 * @param {*} res 
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

/**
 * @api {post} localhost:5000/sim/passengers Add New Passenger
 * @apiName AddNewPassenger
 * @apiGroup Simulation
 * 
 * @apiDescription This endpoint is used to add a new passenger to the simulation.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "passengerId": 1,
 *    "name": "John Doe",
 *    "pickup": {
 *        "position": {
 *            "longitude": -73.9973219,
 *            "latitude": 40.7570936
 *        }
 *    },
 *    "dropoff": {
 *        "position": {
 *            "longitude": -73.9973219,
 *            "latitude": 40.7570936
 *        }
 *    }
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "message": "Passenger has been created successfully.",
 *    "passenger": {
 *        "passengerId": 1,
 *        "pickup": {
 *            "position": {
 *                "node_id": 42433644,
 *                "longitude": -73.9973219,
 *                "latitude": 40.7570936
 *            }
 *        },
 *        "dropoff": {
 *            "position": {
 *                "node_id": 42433644,
 *                "longitude": -73.9973219,
 *                "latitude": 40.7570936
 *            }
 *        },
 *        "status": 0,
 *        "ridePrice": 3
 *    }
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error message"
 *     }
 * 
 * @param {*} req 
 * @param {*} res 
 */
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
 * @api {get} localhost:5000/vehicles Get Vehicle Positions
 * @apiName GetVehiclePositions
 * @apiGroup Simulation
 * 
 * @apiDescription This endpoint returns the current position and other details of all vehicles in the simulation.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "vehicleId": 0,
 *             "name": "Thesla",
 *             "reputation": 5,
 *             "vin": "LM4AC113061105688",
 *             "position": {
 *                 "longitude": -73.995018,
 *                 "latitude": 40.73986
 *             }
 *         },
 *         {
 *             "vehicleId": 1,
 *             "name": "Audio",
 *             "reputation": 6,
 *             "vin": "WAUKEAFM8DA033285",
 *             "position": {
 *                 "longitude": -73.9746686,
 *                 "latitude": 40.7395275
 *             }
 *         },
 *         {
 *             "vehicleId": 2,
 *             "name": "BeMeWe",
 *             "reputation": 7,
 *             "vin": "WAUKEAFM8DA033285",
 *             "position": {
 *                 "longitude": -73.9746686,
 *                 "latitude": 40.7395275
 *             }
 *         }
 *     ]
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error message"
 *     }
 * 
 * @param {*} req 
 * @param {*} res 
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
 * @api {get} localhost:5000/sim/vehicles/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup Simulation
 * 
 * @apiDescription This endpoint retrieves the details of a specific vehicle in the simulation. The vehicle is identified by the `id` provided in the request parameters.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "vehicleId": 1,
 *         "name": "Audio",
 *         "reputation": 6,
 *         "vin": "WAUKEAFM8DA033285",
 *         "position": {
 *             "node_id": 11543660372,
 *             "longitude": -73.9746686,
 *             "latitude": 40.7395275
 *         }
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error message"
 *     }
 * 
 * @param {*} req 
 * @param {*} res 
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

/**
 * @api {get} localhost:5000/sim/passengers Get Passenger Positions
 * @apiName GetPassengerPositions
 * @apiGroup Simulation
 * 
 * @apiDescription This endpoint returns the current position of all passengers in the simulation.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "passengerId": 1,
 *             "position": {
 *                 "node_id": 42433644,
 *                 "longitude": -73.9973219,
 *                 "latitude": 40.7570936
 *             }
 *         },
 *         {
 *             "passengerId": 2,
 *             "position": {
 *                 "node_id": 42433644,
 *                 "longitude": -73.9973219,
 *                 "latitude": 40.7570936
 *             }
 *         }
 *     ]
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error message"
 *     }
 * 
 * @param {*} req 
 * @param {*} res 
 */
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


/**
 * @api {get} localhost:5000/sim/passengers/:id Get Specific Passenger Position
 * @apiName GetPassengerPosition
 * @apiGroup Simulation
 * 
 * @apiDescription This endpoint returns the current position of a specific passenger in the simulation.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "passengerId": 1,
 *         "position": {
 *             "node_id": 42433644,
 *             "longitude": -73.9973219,
 *             "latitude": 40.7570936
 *         }
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error message"
 *     }
 * 
 * @param {*} req 
 * @param {*} res 
 */

const getPassengerPosition = (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        let passenger = simulation.passengers
            .filter(passenger => passenger.passengerId == id)
            .map(passenger => ({
                passengerId: passenger.passengerId,
                name: passenger.name,
                position: passenger.status === PassengerStatus.IN_TRANSIT ? passenger.dropoff.position : passenger.pickup.position
            }));
        console.log('Passenger:', passenger); // Debug point
        res.status(200).json(passenger);
    } catch (err) {
        console.error('Error:', err); // Debug point
        res.status(500).json({ error: err });
    }
}
/**
 * @api {get} localhost:5000/sim/ Get Simulation State
 * @apiName GetSimulationState
 * @apiGroup Simulation
 * 
 * @apiDescription This endpoint returns the current state of the simulation, including the details of all vehicles and passengers.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "vehicles": [
 *         {
 *           "tokenId": 1,
 *           "owner": "John Doe",
 *           "name": "Car",
 *           "description": "A car",
 *           "image": "https://example.com/car.jpg",
 *           "vin": "1234567890",
 *           "location": "37.7749,-122.4194",
 *           "mileage_km": 10000,
 *           "reputation": 5,
 *           "price_usd": 20000,
 *           "expenses": 5000,
 *           "revenue": 10000,
 *           "data": [1, 10000, 5, 20000, 5000, 10000]
 *         },
 *         ...
 *       ],
 *       "passengers": []
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error message"
 *     }
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getSimInfo = (_, res) => {
    //console.log(simulation.getSimInfo())
    res.status(200).json(simulation.getSimInfo())
}



module.exports = { addVehicle, addPassenger, getVehiclesPosition, getSimInfo, getVehiclePosition, getPassengerPositions, getPassengerPosition }