const { ethers, network, run } = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config");
require("dotenv").config();

async function deployDynamicNFTCar(chainId) {
    let priceFeedContract;

    if (developmentChains.includes(network.name)) {
        //Do nothing
    } else {
        //Do nothing 
    }

    const defaultAdmin = process.env.PUBLIC_ADDRESS;

    const dynamicNftFactory = await ethers.getContractFactory("DynamicNFTCar");
    const dynamicNftContract = await dynamicNftFactory.deploy(defaultAdmin);

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    await dynamicNftContract.deploymentTransaction().wait(waitBlockConfirmations);

    console.log(`Dynamic NFT contract deployed to ${dynamicNftContract.target} on ${network.name}`);

    /*if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: dynamicNftContract.target,
            constructorArguments: [defaultAdmin],
        });
    }*/
}

module.exports = {
    deployDynamicNFTCar
};
