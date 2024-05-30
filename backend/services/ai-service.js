require('dotenv').config();
const axios = require('axios');

const HOST = process.env.AI_SERVICE_HOST || 'localhost';
const PORT = process.env.AI_SERVICE_PORT || 8002;
const HOME = process.env.AI_SERVICE_HOME || '/';
const API_FIND_CLOSEST_NODE_ID = process.env.AI_SERVICE_MAP_API_FIND_CLOSEST_NODE
const API_MOVE_VEHICLE = process.env.AI_SERVICE_AI_API_MOVE_VEHICLE
const API_FIND_DISTANCE = process.env.AI_SERIVCE_MAP_API_FIND_DISTANCE
const API_FIND_ROUTE = process.env.AI_SERVICE_AI_API_FIND_ROUTE
const API_FIND_MOCK_DESTINATIONS = process.env.AI_SERVICE_AI_API_FIND_MOCK_DESTINATIONS
const API_FIND_DESTINATIONS = process.env.AI_SERVICE_MAP_API_FIND_DESTINATIONS



const getDestinationsForVehicles = async (vehicles, passenger) => {
  try {
    const response = await axios.post(`http://${HOST}:${PORT}${API_FIND_DESTINATIONS}`, data);
    return response.data;
  } catch (error) {
    //console.error(`Error: ${error}`);
    throw new Error('Error getting destinations for vehicles');
  }
};

/**
 * This function sends a POST request to the AI service to get mock destinations for vehicles.
 * It takes two parameters: an array of vehicle node IDs and an array of passenger node IDs.
 * 
 * @param {Array} vehicle_node_ids - An array of integers representing vehicle node IDs.
 * @param {Array} passenger_node_ids - An array of integers representing passenger node IDs.
 * 
 * @returns {Array} An array of objects. Each object contains a 'vehicle_node_id' and a 'destination_node_id'.
 * The 'destination_node_id' is the best match for the corresponding 'vehicle_node_id'.
 * 
 * Example response:
 * [
 *     {
 *         "vehicle_node_id": 42433644,
 *         "destination_node_id": 42433644
 *     }
 * ]
 * 
 * @throws {Error} When the request to the AI service fails, it throws an Error with the message 'Error getting mock destinations for vehicles'.
 * 
 * @async
 */
const getMockDestinationsForVehicles = async (vehicle_node_ids, passenger_node_ids) => {
  try {
    const response = await axios.post(`http://${HOST}:${PORT}${API_FIND_MOCK_DESTINATIONS}`, {vehicle_node_ids, passenger_node_ids});
    return response.data;
  } catch (error) {
    throw new Error('Error getting mock destinations for vehicles');
  }
}

/**
 * This function sends a GET request to the home endpoint of the AI service to establish a connection.
 * 
 * @returns {Object} An object containing a welcome message from the AI service.
 * 
 * Example response:
 * {
 *     "message": "Welcome to the Web3 Wheels AI API!"
 * }
 * 
 * @throws {Error} When the connection to the AI service fails, it throws an Error with the message 'Error connecting to AI service'.
 * 
 * @async
 */
const connectAIService = async () => {
  try {
    const response = await axios.get(`http://${HOST}:${PORT}${HOME}`);
    console.log(`Connected to AI service at http://${HOST}:${PORT}${HOME}`);
    return {"message": "Welcome to the Web3 Wheels AI API!"};

  } catch (error) {
    throw new Error('Error connecting to AI service')
  }
};


/**
 * This function sends a POST request to the AI service to get the closest node ID for a given vehicle ID and position.
 * 
 * @param {Number} vehicle_id - An integer representing the vehicle ID.
 * @param {Object} position - An object containing the longitude and latitude of the vehicle's current position.
 * 
 * @returns {Object} An object containing the vehicle ID and its closest node position.
 * The position object includes the closest node ID, longitude, and latitude.
 * 
 * Example response:
 * {
 *     "vehicle_id": 1,
 *     "position": {
 *         "node_id": 123456,
 *         "longitude": 12.345678,
 *         "latitude": 87.654321
 *     }
 * }
 * 
 * @throws {Error} When the request to the AI service fails, it throws an Error with the message 'Error getting closest node id from AI service'.
 * 
 * @async
 */
const getClosestNodeId = async (vehicle_id, position) =>{
  try{
    data = {
      vehicle_id, 
      position
    }
    const response = await axios.post(`http://${HOST}:${PORT}${API_FIND_CLOSEST_NODE_ID}`, data)
    return response.data.position
  }catch(error){
   throw new Error('Error getting closest node id from AI service');
  }
}
/**
 * This function sends a POST request to the AI service to move a vehicle to a specified node.
 * 
 * @param {Number} vehicle_id - An integer representing the vehicle ID.
 * @param {Number} next_node_id - An integer representing the next node ID where the vehicle should move.
 * 
 * @returns {Object} An object containing the vehicle ID and its updated position.
 * The position object includes the node ID, longitude, and latitude.
 * 
 * Example response:
 * {
 *     "vehicle_id": 1,
 *     "position": {
 *         "node_id": 2,
 *         "longitude": 37.824454,
 *         "latitude": -122.231589
 *     }
 * }
 * 
 * @throws {Error} When the request to the AI service fails, it throws an Error with the message 'Error moving vehicle'.
 * 
 * @async
 */
const moveVehicle = async (vehicle_id, next_node_id) => {
  try {
    data = {
      vehicle_id, 
      next_node_id
    }
    const response = await axios.post(`http://${HOST}:${PORT}${API_MOVE_VEHICLE}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error moving vehicle');
  }
}

/**
 * This function sends a POST request to the AI service to calculate the distance between two nodes.
 * 
 * @param {Number} passenger_id - An integer representing the passenger ID.
 * @param {Number} source_node_id - An integer representing the source node ID.
 * @param {Number} target_node_id - An integer representing the target node ID.
 * 
 * @returns {Object} An object containing the passenger ID and the calculated distance.
 * 
 * Example response:
 * {
 *     "passenger_id": 1,
 *     "distance": 1000
 * }
 * 
 * @throws {Error} When the request to the AI service fails, it throws an Error with the message 'Error calculating distance based price'.
 * 
 * @async
 */
const calculateDistanceBasedPrice = async (passenger_id, source_node_id, target_node_id) => {
  try{
    data = {
      passenger_id,
      source_node_id,
      target_node_id
    }
    console.log('data', data)
    const response = await axios.post(`http://${HOST}:${PORT}${API_FIND_DISTANCE}`, data);
    return response.data.distance
  }catch(error){
    throw new Error('Error calculating distance based price');
  }
}

const findRoute = async (vehicle_id, source_node_id, target_node_id) => {
  try{
    data = {
      vehicle_id,
      source_node_id,
      target_node_id
    }
    console.log("Findin route", data)
    const response = await axios.post(`http://${HOST}:${PORT}${API_FIND_ROUTE}`, data);
    console.log('response', response.data)
    return response.data
  }catch(error){
    throw new Error('Error finding route');
  }
}



module.exports = {
  getDestinationsForVehicles,
  connectAIService, 
  moveVehicle,
  calculateDistanceBasedPrice,
  getClosestNodeId,
  findRoute,
  getMockDestinationsForVehicles
};