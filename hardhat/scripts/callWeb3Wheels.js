const {ethers} = require("hardhat");
require("dotenv").config();
const {
  VERIFICATION_BLOCK_CONFIRMATIONS
} = require("../helper-hardhat-config");

async function main() {
  try {
      
    const minter = process.env.PUBLIC_ADDRESS;
    const adminRol = "0x0000000000000000000000000000000000000000000000000000000000000000";

    const [deployer] = await ethers.getSigners();
    const carNft = await ethers.getContractAt("DynamicNFTCar", deployer);
    const carNftContract = carNft.attach(
        "0x95401dc811bb5740090279Ba06cfA8fcF6113778" // The deployed contract address
    );
    

    /*const priceConverter = await ethers.getContractAt("PriceConsumerV3", deployer);
    const priceConverterContract = priceConverter.attach(
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // The deployed contract address
    );*/

   
    const market = await ethers.getContractAt("CarMarket", deployer);
    const marketContract = market.attach(
        "0x998abeb3E57409262aE5b751f60747921B33613E" // The deployed contract address
    );


    //Get basic data
    const name = await carNftContract.name();
    const symbol = await carNftContract.symbol();
    const hasAdminRole = await carNftContract.hasRole(adminRol,deployer);
    console.log("---Contract Info---")
    console.log(name);
    console.log(symbol);
    console.log(hasAdminRole);

    const addressTo = minter;
    const carName = "NftCar1";
    const description = "Tesla X";
    const image = "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N";       
    const vin = "AAA111000PK"; //Vehicle identification number 
    const location = "37.826250,-122.247604";
    const mileage_km = 60000;
    const reputation = 5;       
    const price_usdc = 40000; //Could be taken from an API
    const revenue = 0; //Hardcoded to zero to start with
    const expenses = 0; //Hardcoded to zero to start with
   
    //Mint nft
    const txMint = await carNftContract.safeMintWithValues(addressTo,carName,description,image,vin,location,price_usdc);
    await txMint.wait(VERIFICATION_BLOCK_CONFIRMATIONS);
   
    //Get minted car
    const tokenId = 0;
    const mintedCar = await carNftContract.fleet(tokenId);
    console.log("---Minted car---")
    console.log(mintedCar);
    
    //Change metadata   
    const txUpdate = await carNftContract.updateCarEOD(tokenId, 100, 4, 40, 210);
    await txUpdate.wait(VERIFICATION_BLOCK_CONFIRMATIONS);
    //Get updated car
    const updatedCar = await carNftContract.fleet(tokenId);
    console.log("---Updated car---")
    console.log(updatedCar);

    //Last price from feed
    /*const latestPrice = await priceConverterContract.getLatestPrice(); 
    console.log("Price is: ", BigInt(latestPrice).toString());*/   
    
   
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
