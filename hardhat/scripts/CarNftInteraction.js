const {ethers} = require("hardhat");
require("dotenv").config();
const {
  VERIFICATION_BLOCK_CONFIRMATIONS
} = require("../helper-hardhat-config");

async function main() {
  try {
      
    const initialOwner = process.env.PUBLIC_ADDRESS;

    const [deployer] = await ethers.getSigners();    
    const carNft = await ethers.getContractAt("CarNFT", deployer);

    const contract = carNft.attach(
        "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" // The deployed contract address
    );

    //Get basic data
    const name = await contract.name();
    const symbol = await contract.symbol();
    const owner = await contract.owner();
    console.log(name);
    console.log(symbol);
    console.log(owner);

    const addressTo = initialOwner;
    const carName = "NftCar1";
    const description = "Tesla X";
    const image = "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N?filename=vw_beattle.png";       
    const vin = "AAA111000PK"; //Vehicle identification number 
    const location = "37.826250,-122.247604";
    const mileage_km = 60000;
    const reputation = 5;       
    const price_usdc = 40000; //Could be taken from an API
    const profit = 0; //Hardcoded to zero to start with
    const expenses = 0; //Hardcoded to zero to start with

    //Mint nft
    const txMint = await contract.safeMintWithValues(addressTo,carName,description,image,vin,location,mileage_km,reputation,price_usdc);
    await txMint.wait(VERIFICATION_BLOCK_CONFIRMATIONS);
    console.log("Minted car")
    
    //Get minted car
    const tokenId = 0;
    const mintedCar = await contract.fleet(tokenId);
    console.log(mintedCar);
    //Change metadata   
    const txUpdate = await contract.updateMetadata(tokenId);
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
