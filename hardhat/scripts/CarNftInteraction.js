const {ethers} = require("hardhat");

async function main() {
  try {
      
    const [deployer] = await ethers.getSigners();    
    const carNft = await ethers.getContractAt("CarNFT", deployer);

    const contract = carNft.attach(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3" // The deployed contract address
    );

    //Get basic data
    const name = await contract.name();
    const symbol = await contract.symbol();
    const owner = await contract.owner();
    console.log(name);
    console.log(symbol);
    console.log(owner);

    const addressTo = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const carName = "NftCar1";
    const description = "Tesla";
    const image = "https://ipfs.io/ipfs/QmY5DKGBjFMPLwg8PdvQavb8apR2TjoGqWn4JCxhs6xudC?filename=vw_beattle.json";       
    const vin = "AAA111000PK"; //Vehicle identification number 
    const year = 2020;
    const mileage_km = 60000;
    const reputation = 5;       
    const price_usdc = 40000; //Could be taken from an API
    const model = "X"
    //Mint nft
    await contract.safeMintWithValues(addressTo,carName,description,image,vin,year,mileage_km,reputation,price_usdc,model);
    //Get minted car
    const tokenId = 0;
    const mintedCar = await contract.fleet(tokenId);
    console.log(mintedCar);
    //Change metadata   
    await contract.updateMetadata(tokenId);
    //Get updated car
    const updatedCar = await contract.fleet(tokenId);
    console.log(updatedCar);

    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
