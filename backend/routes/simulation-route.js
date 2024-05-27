const express = require('express')
const {addVehicle, addPassenger, getVehiclesPosition, getSimInfo} = require ('../controllers/simulation-controller')


const router = express.router()

router.route('/').get(getSimInfo)

router.route('/vehicles/')
    .get(getVehiclesPosition)
    .post(addVehicle)
    .delete()

router.route('/vehicles/:id')
    .get()
    .


router.route()
router.route()
