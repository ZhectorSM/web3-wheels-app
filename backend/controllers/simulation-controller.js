const {simulation} = require('../models/simulation')


const addVehicle = (req, res) => {
    const vehicleData = req.body

    simulation.addVehicle(vehicleData)
}

const addPassenger = (req, res) => {

}

const getVehiclesPosition = (req, res) =>{
    try{
        let selectedAttributes = simulation.vehicles.map(vehicle => ({
            vehicle_id: vehicle.tokenId,
            position: {
                longitude: vehicle.position.longitude,
                latitude: vehicle.position.latitude
            }
        }));
        res.status(200).json(selectedAttributes)
    }catch(err){
        res.status(500).json({ error : err})
    }
}

const getVehiclePosition = (req, res) => {
    const {id} = req.params;
    try{
        let vehicle = simulation.vehicles
        .find(vehicle => vehicle.id === id)
        .map(vehicle => ({
            vehicle_id : vehicle.tokenId,
            position: {
                longitude: vehicle.position.longitude,
                latitude: vehicle.position.latitude
            }
        }));

    }catch(err){
        res.status(500).json({ error : err})
    }
}

const getSimInfo = (req,res) => {

}



module.exports = {addVehicle, addPassenger, getVehiclesPosition, getSimInfo}