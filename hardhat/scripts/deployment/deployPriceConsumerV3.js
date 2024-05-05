const { ethers, network, run } = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config");

async function deployPriceConsumerV3(chainId) {
    let priceFeedContract;

    if (developmentChains.includes(network.name)) {
        const DECIMALS = "18";
        const INITIAL_PRICE = "200000000000000000000";

        const mockV3AggregatorFactory = await ethers.getContractFactory(
            "@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol:MockV3Aggregator"
        );
        const mockV3Aggregator = await mockV3AggregatorFactory.deploy(DECIMALS, INITIAL_PRICE);

        priceFeedContract = mockV3Aggregator.target;
    } else {
        priceFeedContract = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    const priceConsumerV3Factory = await ethers.getContractFactory("PriceConsumerV3");
    const priceConsumerV3 = await priceConsumerV3Factory.deploy(priceFeedContract);

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    await priceConsumerV3.deploymentTransaction().wait(waitBlockConfirmations);

    console.log(`ETH/USD Price Consumer deployed to ${priceConsumerV3.target} on ${network.name}`);

    /*if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: priceConsumerV3.target,
            constructorArguments: [priceFeedContract],
        });
    }*/
}

module.exports = {
    deployPriceConsumerV3
};
