const { readFile, writeFile, unlink, stat } = require('fs').promises
const path = require('path');

const dataPath = 'data'
const vehiclesDataPath = 'vehicles'

const dbReadVehicle = async (vehicleTokenId) => {
    try {
        const filePath = path.join(__dirname, dataPath, vehiclesDataPath, `${vehicleTokenId}.json`);
        const data = await readFile(filePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
    }

}

const dbSaveVehicle = async (vehicleTokenId, data) => {
    try {
        const filePath = path.join(__dirname, 'data', 'vehicles', `${vehicleTokenId}.json`);

        //check if file exists
        if (stat(filePath)) {
           throw(`File ${vehicleTokenId}.json already exists. Please use the update endpoint instead.`);
        }

        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Data has been written to file ${vehicleTokenId}.json successfully.`);
    } catch (error) {
        console.error(`Error writing file to disk: ${error}`);
    }
}

const dbUpdateVehicle = async (vehicleTokenId, data) => {
    try {
        const filePath = path.join(__dirname, 'data', 'vehicles', `${vehicleTokenId}.json`);
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Data has been updated in file ${vehicleTokenId}.json successfully.`);
    } catch (error) {
        console.error(`Error updating file: ${error}`);
    }
}


const dbDeleteVehicle = async (vehicleTokenId) => {
    try {
        const filePath = path.join(__dirname, 'data', 'vehicles', `${vehicleTokenId}.json`);
        await unlink(filePath);
        console.log(`File ${vehicleTokenId}.json has been deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
    }
}

