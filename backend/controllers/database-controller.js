const {dbReadVehicle, dbSaveVehicle, dbUpdateVehicle, dbDeleteVehicle, dbReadAllVehicles} = require('../database/database')

const getVehicleAttributes = (req, res) => {
    const { id } = req.params;
    dbReadVehicle(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
        res.end()
}

const getAllVehiclesAttributes = (req, res) => {
    dbReadAllVehicles()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })

}

const createVehicle = (req, res) => {
    const data = req.body;
    const id = data.tokenId 
    dbSaveVehicle(id, data)
        .then(() => {
            res.status(201).json({ message: 'Vehicle has been created successfully.' })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
}

const updateVehicle = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    dbUpdateVehicle(id, data)
        .then(() => {
            res.status(200).json({ message: 'Vehicle has been updated successfully.' })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
}

const deleteVehicle = (req, res) => {
    const { id } = req.params;
    dbDeleteVehicle(id)
        .then(() => {
            res.status(200).json({ message: 'Vehicle has been deleted successfully.' })
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })

}


module.exports = { getVehicleAttributes, getAllVehiclesAttributes, createVehicle, updateVehicle, deleteVehicle }