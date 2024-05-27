const express = require('express')
const { getVehicleAttributes, getAllVehiclesAttributes, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/database-controller')

const databaseRouter = express.Router()


databaseRouter.route('/vehicles').get(getAllVehiclesAttributes)
    .post(createVehicle)

databaseRouter.route('/vehicles/:id')
    .get(getVehicleAttributes)
    .put(updateVehicle)
    .delete(deleteVehicle)


module.exports = databaseRouter