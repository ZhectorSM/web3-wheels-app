const simulation = require('../models/simulation')


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

const addPassenger = (req, res) => {
    const passengerData = req.body
    console.log(passengerData)
    simulation.addPassenger(passengerData)
        .then((passenger) => {
            res.status(201).json({ message: 'Passenger has been created successfully.', passenger: passenger })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
}

const getVehiclesPosition = (req, res) => {
    try {
        let selectedAttributes = simulation.vehicles.map(vehicle => ({
            vehicle_id: vehicle.tokenId,
            position: {
                longitude: vehicle.position.longitude,
                latitude: vehicle.position.latitude
            }
        }));
        res.status(200).json(selectedAttributes)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const getVehiclePosition = (req, res) => {
    const { id } = req.params;
    try {
        let vehicle = simulation.vehicles
            .find(vehicle => vehicle.id === id)
            .map(vehicle => ({
                vehicle_id: vehicle.tokenId,
                position: {
                    longitude: vehicle.position.longitude,
                    latitude: vehicle.position.latitude
                }
            }));

    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const getSimInfo = (req, res) => {

}



module.exports = { addVehicle, addPassenger, getVehiclesPosition, getSimInfo }