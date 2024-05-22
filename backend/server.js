require('dotenv').config();
const express = require ('express');
const { connectAIService } = require('./services/ai-service')
const vehicles = require('./routes/vehicles')
const passengers = require('./routes/passengers')

const app = express();
const port = process.env.SERVER_PORT || 5000; 
const hostname = process.env.SERVER_HOSTNAME || 'localhost';

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())


app.use('/vehicles', vehicles)
app.use('/passengers', passengers)


const start = async () => {
  try {
    console.log('Connecting to AI service...');
    //await connectAIService();
    app.listen(port, hostname,() =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();