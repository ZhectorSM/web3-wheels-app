const { ethers, network, run } = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config");

async function deployRandomNumberDirectFundingConsumer(chainId) {
    
    const pointOneLink = 100000000000000000n; // 0.1
    const pointZeroZeroThreeLink = 3000000000000000n; // 0.003
    const oneHundredLink = 100000000000000000000n; // 100 LINK

    // Configuration

    // This value is the worst-case gas overhead from the wrapper contract under the following
    // conditions, plus some wiggle room:
    //   - 10 words requested
    //   - Refund issued to consumer
    const wrapperGasOverhead = 60_000n;
    const coordinatorGasOverhead = 52_000n;
    const wrapperPremiumPercentage = 10;
    const maxNumWords = 10;
    const weiPerUnitLink = pointZeroZeroThreeLink;

    let wrapper, wrapperContract, linkContract;
    if (chainId == 31337) {
        // first deploy VRFCoordinatorV2
        /**
         * @dev Read more at https://docs.chain.link/docs/chainlink-vrf/
         */

        const coordinatorFactory = await ethers.getContractFactory("VRFCoordinatorV2Mock");
        const coordinator = await coordinatorFactory.deploy(
            pointOneLink,
            1e9 // 0.000000001 LINK per gas
        );

        const linkEthFeedFactory = await ethers.getContractFactory("MockV3Aggregator");
        const linkEthFeed = await linkEthFeedFactory.deploy(18, weiPerUnitLink); // 1 LINK = 0.003 ETH

        const linkFactory = await ethers.getContractFactory("LinkToken");
        const link = await linkFactory.deploy();
        linkContract = link;

        const wrapperFactory = await ethers.getContractFactory("VRFV2Wrapper");
        wrapper = await wrapperFactory.deploy(
            linkContract.target,
            linkEthFeed.target,
            coordinator.target
        );
        wrapperContract = wrapper.target;

        // configure wrapper
        const keyHash = networkConfig[chainId]["keyHash"];
        await wrapper.setConfig(
            wrapperGasOverhead,
            coordinatorGasOverhead,
            wrapperPremiumPercentage,
            keyHash,
            maxNumWords
        );

        // fund subscription. The Wrapper's subscription id is 1
        await coordinator.fundSubscription(1, oneHundredLink);
    } else {
        wrapperContract = networkConfig[chainId]["vrfWrapper"];
        linkContract = networkConfig[chainId]["linkToken"];
    }

    const randomNumberConsumerV2Factory = await ethers.getContractFactory(
        "RandomNumberDirectFundingConsumerV2"
    );
    const randomNumberConsumerV2 = await randomNumberConsumerV2Factory.deploy(
        linkContract,
        wrapperContract
    );

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    await randomNumberConsumerV2.deploymentTransaction().wait(waitBlockConfirmations);

    console.log(
        `Random Number Direct Funding Consumer deployed to ${randomNumberConsumerV2.target} on ${network.name}`
    );

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: randomNumberConsumerV2.target,
            constructorArguments: [linkContract, wrapperContract],
        });
    }

    if (chainId == 31337) {
        console.log(
            `Run the following command to fund your contract with link tokens: yarn hardhat transfer-link --recipient ${randomNumberConsumerV2.target} --linkaddress ${linkContract.target} --amount REPLACE_AMOUNT_IN_JUELS --network ${network.name}`
        );
    } else {
        console.log(
            `Run the following command to fund your contract with link tokens: yarn hardhat transfer-link --recipient ${randomNumberConsumerV2.target} --amount REPLACE_AMOUNT_IN_JUELS --network ${network.name}`
        );
    }
}

module.exports = {
    deployRandomNumberDirectFundingConsumer,
};
