require('dotenv').config();
const express = require('express');
const simulation = require('./models/simulation')
const databaseRouter = require('./routes/database-route')
const simulationRouter = require('./routes/simulation-route')

const app = express();
const port = process.env.SERVER_PORT || 5000;
const hostname = process.env.SERVER_HOSTNAME || 'localhost';

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/db', databaseRouter)
app.use('/sim', simulationRouter)

//home call when service is up
app.get('/', (req, res) => {  
  res.send('Web3Wheels');
  //get path to this route
  console.log(req.originalUrl);
});

const start = async () => {
  try {
    await simulation.setup()
      .then(() => { simulation.start() })

    app.listen(port, hostname, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
};

start();