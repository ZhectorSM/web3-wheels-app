require('dotenv').config();
const axios = require('axios');

const HOST = process.env.AI_SERVICE_HOST || 'localhost';
const PORT = process.env.AI_SERVICE_PORT || 8002;
const HOME = process.env.AI_SERVICE_HOME || '/';

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

module.exports = {
  getDestinationsForVehicles,
  connectAIService
};