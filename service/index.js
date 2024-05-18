import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';dotenv.config();
import fleetRoutes from './routes/fleet.js';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/fleet', fleetRoutes);

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
