require('dotenv').config();
const express = require ('express');
const { connectAIService } = require('./services/ai-service')
const {simulation} = require('./models/simulation')
const vehicles = require('./routes/vehicles')
const passengers = require('./routes/passengers')

const app = express();
const port = process.env.SERVER_PORT || 5000; 
const hostname = process.env.SERVER_HOSTNAME || 'localhost';

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())


app.use('/db/vehicles', vehicles)
app.use('/sim', )
app.use('//passengers', passengers)


const start = async () => {
  try {
    console.log('Connecting to AI service...');
    await connectAIService();
    await simulation.setup();
    simulation.start()
    app.listen(port, hostname,() =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();