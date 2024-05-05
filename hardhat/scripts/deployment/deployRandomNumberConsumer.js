const { ethers, network, run } = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config");

async function deployRandomNumberConsumer(chainId) {
    let VRFCoordinatorV2Mock;
    let subscriptionId;
    let vrfCoordinatorContract;
    let transaction;

    if (chainId == 31337) {
        const BASE_FEE = "100000000000000000";
        const GAS_PRICE_LINK = "1000000000"; // 0.000000001 LINK per gas

        const VRFCoordinatorV2MockFactory = await ethers.getContractFactory("VRFCoordinatorV2Mock");
        VRFCoordinatorV2Mock = await VRFCoordinatorV2MockFactory.deploy(BASE_FEE, GAS_PRICE_LINK);
        vrfCoordinatorContract = VRFCoordinatorV2Mock.target;

        const fundAmount = networkConfig[chainId]["fundAmount"] || "1000000000000000000";

        transaction = await VRFCoordinatorV2Mock.createSubscription();
        const transactionReceipt = await transaction.wait(1);
        subscriptionId = BigInt(transactionReceipt.logs[0].topics[1]);

        await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, fundAmount);
    } else {
        subscriptionId = networkConfig[chainId]["subscriptionId"];
        vrfCoordinatorContract = networkConfig[chainId]["vrfCoordinator"];
    }

    const keyHash = networkConfig[chainId]["keyHash"];

    const randomNumberConsumerV2Factory = await ethers.getContractFactory("RandomNumberConsumerV2");
    const randomNumberConsumerV2 = await randomNumberConsumerV2Factory.deploy(
        subscriptionId,
        vrfCoordinatorContract,
        keyHash
    );

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    const transactionReceipt = await transaction.wait(1);
    await randomNumberConsumerV2.deploymentTransaction().wait(waitBlockConfirmations);

    console.log(
        `Random Number Consumer deployed to ${randomNumberConsumerV2.target} on ${network.name}`
    );

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: randomNumberConsumerV2.target,
            constructorArguments: [subscriptionId, vrfCoordinatorContract, keyHash],
        });
    }

    if (chainId == 31337) {
        VRFCoordinatorV2Mock.addConsumer(subscriptionId, randomNumberConsumerV2.target);
    }
}

module.exports = {
    deployRandomNumberConsumer,
};
