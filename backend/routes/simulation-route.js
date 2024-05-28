const express = require('express')
const { addVehicle, addPassenger, getVehiclesPosition, getSimInfo, getVehiclePosition, getPassengerPositions, getPassengerPosition } = require('../controllers/simulation-controller')

/**
 * GET /: This route returns information about the simulation. The exact details of what is returned are determined by the getSimInfo controller function.
 * 
 * GET /vehicles: This route returns an array of all vehicles in the simulation, including each vehicle's position. The positions are determined by the getVehiclesPosition controller function.
 * 
 * POST /vehicles: This route adds a new vehicle to the simulation. The details of the new vehicle are provided in the request body and processed by the addVehicle controller function.
 * 
 * GET /vehicles/:id: This route returns the position of a specific vehicle in the simulation. The ID of the vehicle is provided as a route parameter and used by the getVehiclePosition controller function.
 * 
 * POST /passengers: This route adds a new passenger to the simulation. The details of the new passenger are provided in the request body and processed by the addPassenger controller function.
 * 
 * GET /passengers: This route returns the positions of all passengers in the simulation. The positions are determined by the getPassengerPositions controller function.
 * 
 * GET /passengers/:id: This route returns the position of a specific passenger in the simulation. The ID of the passenger is provided as a route parameter and used by the getPassengerPosition controller function.
 */

const simulationRouter = express.Router()

simulationRouter.route('/')
    .get(getSimInfo)

simulationRouter.route('/vehicles')
    .get(getVehiclesPosition)
    .post(addVehicle)

simulationRouter.route('/vehicles/:id')
    .get(getVehiclePosition)

simulationRouter.route('/passengers')
    .post(addPassenger)
    .get(getPassengerPositions)

simulationRouter.route('/passengers/:id')
    .get(getPassengerPosition)


module.exports = simulationRouter
