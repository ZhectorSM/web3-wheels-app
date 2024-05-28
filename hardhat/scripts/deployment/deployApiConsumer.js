const { ethers, network, run } = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config");
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.4/LinkToken.json");

async function deployApiConsumer(chainId) {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    let linkToken;
    let mockOracle;
    let linkTokenContract;
    let oracleContract;

    if (chainId == 31337) {
        const linkTokenFactory = await ethers.getContractFactory("LinkToken");
        linkToken = await linkTokenFactory.connect(deployer).deploy();
      
        const mockOracleFactory = await ethers.getContractFactory("MockOracle");
        mockOracle = await mockOracleFactory.connect(deployer).deploy(linkToken);
        
        linkTokenContract = linkToken.target;//We can send the contract itself or the address only
        oracleContract = mockOracle.target;
       
    } else {
        oracleContract = networkConfig[chainId]["oracle"];
        linkTokenContract = networkConfig[chainId]["linkToken"];
        linkToken = new ethers.Contract(linkTokenContract, LINK_TOKEN_ABI, deployer);
    }

    const jobId = ethers.toUtf8Bytes(networkConfig[chainId]["jobId"]);
    const fee = networkConfig[chainId]["fee"];

    const apiConsumerFactory = await ethers.getContractFactory("APIConsumer");
    const apiConsumer = await apiConsumerFactory.deploy(
        oracleContract,
        jobId,
        fee,
        linkTokenContract
    );

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    await apiConsumer.deploymentTransaction().wait(waitBlockConfirmations);

    console.log(`APIConsumer deployed to ${apiConsumer.target} on ${network.name}`);

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: apiConsumer.target,
            constructorArguments: [oracleContract, jobId, fee, linkTokenContract],
        });
    }

    // auto-funding
    const fundAmount = networkConfig[chainId]["fundAmount"];
    await linkToken.transfer(apiConsumer, fundAmount);

    console.log(`APIConsumer funded with ${fundAmount} JUELS`);    
}

module.exports = {
    deployApiConsumer,
};
