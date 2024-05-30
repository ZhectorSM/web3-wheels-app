const {existsSync} = require('fs');
const { readFile, writeFile, unlink, access, readdir } = require('fs').promises
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
        throw(`Error reading file: ${error}`)
    }

}
const dbReadAllVehicles = async () => {
    try {
        const vehiclesDirPath = path.join(__dirname, dataPath, vehiclesDataPath);
        const files = await readdir(vehiclesDirPath);
        const vehicles = [];
        for (const file of files) {
            //console.log(`Reading file ${file}...`);
            const filePath = path.join(vehiclesDirPath, file);
            const data = await readFile(filePath, 'utf8');
            const vehicle = JSON.parse(data);
            vehicles.push(vehicle);
        }
       // console.log(`All vehicles: ${vehicles}`);
        return vehicles;
    } catch (error) {
        console.error(`Error reading all vehicles: ${error}`);
        throw(`Error reading all vehicles: ${error}`);
    }
}


const dbSaveVehicle = async (vehicleTokenId, data) => {
    try {
        const filePath = path.join(__dirname, 'data', 'vehicles', `${vehicleTokenId}.json`);

        //check if file exists
        if (existsSync(filePath)) {
           throw(`File ${vehicleTokenId}.json already exists. Please use the update endpoint instead.`);
        }
        console.log(`Writing data ${data} to file ${vehicleTokenId}.json...`);
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Data has been written to file ${vehicleTokenId}.json successfully.`);
    } catch (error) {
        console.error(`Error writing file to: ${error}`);
        throw(`Error writing file to: ${error}`);
    }
}

const dbUpdateVehicle = async (vehicleTokenId, data) => {
    try {
        const filePath = path.join(__dirname, 'data', 'vehicles', `${vehicleTokenId}.json`);
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        //console.log(`Data has been updated in file ${vehicleTokenId}.json successfully.`);
    } catch (error) {
        console.error(`Error updating file: ${error}`);
        throw(`Error updating file: ${error}`);
    }
}


const dbDeleteVehicle = async (vehicleTokenId) => {
    try {
        const filePath = path.join(__dirname, 'data', 'vehicles', `${vehicleTokenId}.json`);
        await unlink(filePath);
        console.log(`File ${vehicleTokenId}.json has been deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
        throw(`Error deleting file: ${error}`);
    }
}

module.exports = {dbReadVehicle, dbSaveVehicle, dbUpdateVehicle, dbDeleteVehicle, dbReadAllVehicles}

