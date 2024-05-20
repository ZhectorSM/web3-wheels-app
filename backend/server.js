require('dotenv').config();
const express = require ('express');
const 


const app = express();
const port = process.env.ROUTE || 5000; 


app.use('/vehicles', )

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
