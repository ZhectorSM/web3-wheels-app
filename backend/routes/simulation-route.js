const express = require('express')
const { addVehicle, addPassenger, getVehiclesPosition, getSimInfo } = require('../controllers/simulation-controller')


const simulationRouter = express.Router()

simulationRouter.route('/')
    .get(getSimInfo)

simulationRouter.route('/vehicles')
    .get(getVehiclesPosition)
    .post(addVehicle)

simulationRouter.route('/passengers')
    .post(addPassenger)


module.exports = simulationRouter
