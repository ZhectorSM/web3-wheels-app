import express from 'express';
const router = express.Router();

//Mock db
const fleet = [
    {
      tokenId: 0,
      owner: 'NftCar0',
      name: 'Thesla',
      description: 'Autonomous car',
      image: 'https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N',
      vin: 'LM4AC113061105688',
      location: '37.826250,-122.247604',
      mileage_km: 60000,
      reputation: 5,
      price_usd: 40000,
      revenue: 100,
      expenses:  40    
    },
    {
      tokenId: 1,
      owner: 'NftCar1',
      name: 'Audio',
      description: 'Self driving car',
      image: 'https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N',
      vin: 'WAUKEAFM8DA033285',
      location: '3.80,-12.645',
      mileage_km: 10000,
      reputation: 6,
      price_usd: 50000,
      revenue: 70,
      expenses:  20    
    }
  ];


// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(fleet);
})

export default router