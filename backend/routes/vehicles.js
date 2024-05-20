const express = require('express')
const router = express.Router()
const { getVehicleAttributes, getAllVehiclesAttributes, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicles')


router.route('/').get(getAllVehiclesAttributes)

router.route('/:id')
    .get(getVehicleAttributes)
    .post(createVehicle)
    .put(updateVehicle)
    .delete(deleteVehicle)