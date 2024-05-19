const { ethers, network, run } = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config");
require("dotenv").config();

async function deployWeb3Wheels(chainId) {


    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    
    let priceFeedContract;

    if (developmentChains.includes(network.name)) {
        const DECIMALS = "8";
        const INITIAL_PRICE = "301500000000";

        const mockV3AggregatorFactory = await ethers.getContractFactory(
            "@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol:MockV3Aggregator"
        );
        const mockV3Aggregator = await mockV3AggregatorFactory.deploy(DECIMALS, INITIAL_PRICE);

        priceFeedContract = mockV3Aggregator.target;
    } else {
        priceFeedContract = networkConfig[chainId]["ethUsdPriceFeed"];
    }


    //FEED
    /*const priceConverterFactory = await ethers.getContractFactory("PriceConverter");
    const priceConverterV3 = await priceConverterFactory.deploy(priceFeedContract);   
    await priceConverterV3.deploymentTransaction().wait(waitBlockConfirmations);
    console.log(`ETH/USD Price Consumer deployed to ${priceConverterV3.target} on ${network.name}`)*/


    //DYNAMIC NFT
    const defaultAdmin = process.env.PUBLIC_ADDRESS;

    const dynamicNftFactory = await ethers.getContractFactory("DynamicNFTCar");
    const dynamicNftContract = await dynamicNftFactory.deploy(defaultAdmin);    
    await dynamicNftContract.deploymentTransaction().wait(waitBlockConfirmations);
    console.log(`Dynamic NFT contract deployed to ${dynamicNftContract.target} on ${network.name}`);

    //MARKET
    const carMarketFactory = await ethers.getContractFactory("CarMarket");
    const carMarketContract = await carMarketFactory.deploy(dynamicNftContract.target);    
    await carMarketContract.deploymentTransaction().wait(waitBlockConfirmations);
    console.log(`Dynamic Car Market contract deployed to ${carMarketContract.target} on ${network.name}`);
    
}

module.exports = {
    deployWeb3Wheels
};
