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

    const contract = carNft.attach(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3" // The deployed contract address
    );

    //Get basic data
    const name = await contract.name();
    const symbol = await contract.symbol();
    const hasAdminRole = await contract.hasRole(adminRol,deployer);
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
    const profit = 0; //Hardcoded to zero to start with
    const expenses = 0; //Hardcoded to zero to start with

    //Mint nft
    const txMint = await contract.safeMintWithValues(addressTo,carName,description,image,vin,location,price_usdc);
    await txMint.wait(VERIFICATION_BLOCK_CONFIRMATIONS);
    console.log("Minted car")
    
    //Get minted car
    const tokenId = 0;
    const mintedCar = await contract.fleet(tokenId);
    console.log(mintedCar);
    //Change metadata   
    const txUpdate = await contract.updateCarEOD(tokenId, 100, 4, 40, 210);
    await txUpdate.wait(VERIFICATION_BLOCK_CONFIRMATIONS);
    //Get updated car
    const updatedCar = await contract.fleet(tokenId);
    console.log(updatedCar);
   
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
