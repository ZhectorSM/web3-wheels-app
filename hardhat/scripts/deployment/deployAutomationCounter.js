const { ethers, network, run } = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config");

async function deployAutomationCounter(chainId) {
    const automationUpdateInterval = networkConfig[chainId]["automationUpdateInterval"];

    const automationCounterFactory = await ethers.getContractFactory("AutomationCounter");
    const automationCounter = await automationCounterFactory.deploy(automationUpdateInterval);

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    await automationCounter.deploymentTransaction().wait(waitBlockConfirmations);

    console.log(`Automation Counter deployed to ${automationCounter.target} on ${network.name}`);

    /*if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: automationCounter.target,
            constructorArguments: [automationUpdateInterval],
        });
    }*/
}

module.exports = {
    deployAutomationCounter,
};
