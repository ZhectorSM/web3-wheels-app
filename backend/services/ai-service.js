require('dotenv').config();
const axios = require('axios');

const HOST = process.env.AI_SERVICE_HOST || 'localhost';
const PORT = process.env.AI_SERVICE_PORT || 8002;
const HOME = process.env.AI_SERVICE_HOME || '/';
const API_FIND_CLOSEST_NODE_ID = process.env.AI_SERVICE_MAP_API_FIND_CLOSEST_NODE
const API_MOVE_VEHICLE = process.env.AI_SERVICE_MAP_API_MOVE_VEHICLE
const API_FIND_DISTANCE = process.env.AI_SERIVCE_MAP_API_FIND_DISTANCE

const getDestinationsForVehicles = async (map, vehicles, passenger) => {
  try {
    const response = await axios.post(`http://${HOST}:${PORT}/path/to/api`, data);
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const connectAIService = async () => {
  try {
    const response = await axios.get(`http://${HOST}:${PORT}${HOME}`);
    console.log(`Connected to AI service at http://${HOST}:${PORT}${HOME}`);

  } catch (error) {
    console.error(`Error connecting to AI service: ${error}`);
    throw error;
  }
};

/**
 * 
 * @param {} vehicleId eg. vehicleId = 1
 * @param {} position eg. position = {longitude : 12, latitude : 13}
 * @returns "{
            "vehicle_id": 1,
            "position": {
                "node_id": 2,
                "longitude": 37.824454,
                "latitude": -122.231589,
            },
        }"
 */

const getClosestNodeId = async (vehicle_id, position) =>{
  try{
    data = {
      vehicle_id,
      position
    }
    const response = await axios.get(`http://${HOST}:${PORT}${API_FIND_CLOSEST_NODE_ID}`, data)
    return response.data.position
  }catch(error){
    console.error(`Error getting closest node id from AI service: ${error}`);
    throw error
  }
}

/**
 * 
 * @param {*} vehicle_id eg. 1 
 * @param {*} next_node_id eg. 2
 * @returns "{
            "vehicle_id": 1,
            "position": {
                "node_id": 2,
                "longitude": 37.824454,
                "latitude": -122.231589,
            },
        }"
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
    console.error(`Error: ${error}`);
    throw error;
  }
}

/**
 * 
 * @param {*} passenger_id eg. 1 
 * @param {*} source_node_id eg. 2
 * @param {*} target_node_id eg. 3
 * @returns " {
            "passenger_id": 1,
            "distance": 1000,
        }"
 */
const calculateDistanceBasedPrice = async (passenger_id, source_node_id, target_node_id) => {
  try{
    data = {
      passenger_id,
      source_node_id,
      target_node_id
    }
    const response = await axios.post(`http://${HOST}:${PORT}${API_FIND_DISTANCE}`, data);
    return response.data
  }catch(error){
    console.error(`Error: ${error}`);
    throw error;
  }
}

module.exports = {
  getDestinationsForVehicles,
  connectAIService, 
  moveVehicle,
  calculateDistanceBasedPrice,
  getClosestNodeId,
};