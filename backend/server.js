require('dotenv').config();
const fs = require('fs');
const express = require ('express');


const app = express();
const port = process.env.ROUTE || 5000; 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
