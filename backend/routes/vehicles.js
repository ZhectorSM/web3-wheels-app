const express = require('express')
const { getVehicleAttributes, getAllVehiclesAttributes, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicles')

const router = express.Router()


router.route('/').get(getAllVehiclesAttributes)

router.route('/:id')
    .get(getVehicleAttributes)
    .post(createVehicle)
    .put(updateVehicle)
    .delete(deleteVehicle)


module.exports = router