<!--
SPDX-License-Identifier: MIT
SPDX-FileCopyrightText: 2024 R. Berkay Bozkurt <resitberkaybozkurt@gmail.com>
-->
# Web3Wheels

## Description
Web3Wheels is a decentralized autonomous Uber service utilizing blockchain and AI technologies. Users can mint, own, and trade self-driving car NFTs. Real-time data and smart contracts ensure transparency, efficiency, and a seamless user experience.

## Live Demo
 App: https://web3-wheels-app.vercel.app/   
 BackendApi: https://web3-wheels-service.vercel.app/vehicles/

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Smart Contracts](#smart-contracts)
- [Additional Information](#additional-information)
- [Technologies](#technologies)
- [License](#license)
- [Resources](#resources)

## Installation

### Prerequisites
- MetaMask for interacting with the Ethereum blockchain.
- Remix.ethereum.org for deploying smart contracts.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/ZhectorSM/web3-wheels.git
    cd web3-wheels
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Deploy Smart Contracts using Remix:
    - Open [Remix.ethereum.org](https://remix.ethereum.org/).
    - Import the smart contract files from the `contracts` directory.
    - Compile and deploy the smart contracts using MetaMask to connect to an Ethereum testnet (e.g., Ropsten or Rinkeby).

4. Update Contract Addresses:
    - After deploying the contracts, update the contract addresses in the frontend configuration files.

5. Start the frontend application:
    ```bash
    npm start
    ```

## Usage

### Minting Cars
1. Open the application in your browser.
2. Connect your MetaMask wallet.
3. Use the interface to mint a new car NFT with 0km.

### Buying Cars
1. Browse available car NFTs in the TokenShop.
2. Purchase a car NFT using your MetaMask wallet.

### Ride Requests
1. Request a ride specifying your requirements.
2. The AI agent will match you with an available self-driving car.

## Architecture

### Overview
Web3Wheels comprises the following components:
- **Frontend**: A web application for user interaction.
- **Smart Contracts**: Manage vehicle minting NFTs, ownership, and transactions.
- **Backend**: Handles data processing and AI integration.
- **AI Module**: Autonomous decision-making for self-driving cars. Processes ride requests and optimizes routes.
- **Chainlink**: Fetches datafeeds, verifies dealer legitimacy and pull data from an API

![Overview](https://github.com/ZhectorSM/web3-wheels-app/blob/main/resources/docs/Components.png?raw=true)
### Processes On/Off Chain
![Components](https://github.com/ZhectorSM/web3-wheels-app/blob/main/resources/docs/Overview.png?raw=true)


### Data Flow

![Data flow](https://github.com/ZhectorSM/web3-wheels-app/blob/main/resources/docs/web3%20wheels%20flow.png?raw=true)

## SmartContracts
SEPOLIA
- Price converter https://sepolia.etherscan.io/address/0xfdb033664a6697bb169a3eadfdff4dc24a483ea2
                  [Watch the code [here](https://github.com/ZhectorSM/web3-wheels-app/blob/main/hardhat/contracts/PriceConverter.sol)]


- DynamicNFT      https://sepolia.etherscan.io/address/0xe75c0b572734e33a8fffade726f5a1a19c047f19
                  [Watch the code [here](https://github.com/ZhectorSM/web3-wheels-app/blob/main/hardhat/contracts/DynamicNFTCar.sol)]

- CarMarket	      https://sepolia.etherscan.io/address/0xc46aa6c161dfc5c548a2f2de43dbec1c18075f74
                  [Watch the code [here](https://github.com/ZhectorSM/web3-wheels-app/blob/main/hardhat/contracts/CarMarket.sol)]

- ApiEodConsumer  https://sepolia.etherscan.io/address/0x55222eabcfdeed967ef3a0ed30f8c76733c57e4a
                  [Watch the code [here](https://github.com/ZhectorSM/web3-wheels-app/blob/main/hardhat/contracts/CarEodDataConsumer.sol)]

- Web3Wheels EOD  https://sepolia.etherscan.io/address/0xdd80c0bfc95af6b3e0a0915bdf559352f73b947a (Upkeep Every 24 hrs)

![Smart Contracts](https://github.com/ZhectorSM/web3-wheels-app/blob/main/resources/docs/Smart%20contracts.png?raw=true)


## Additional Information

### Technologies
![Technologies](https://github.com/ZhectorSM/web3-wheels-app/blob/main/resources/docs/Technologies.png?raw=true)


### Sponsors bounties

SCROLL


- Price converter https://sepolia.scrollscan.com/address/0x130334445170c2afe4c67c6f619796349f75d7d1
- DynamicNFT      https://sepolia.scrollscan.com/address/0x3def777142a14cd8639fbc9d71344a2b02af5a04
- CarMarket	    https://sepolia.scrollscan.com/address/0xb11b5958C87CBf73F2481D568994A3fAeEC20943

Note. The smart contracts are deployed and verified. 
We have some limitations with chainlink integration products (Functions, Automation) and compatibility issues with PUSH0(0x5f) opcode to have a fully functional flow.

DEXTOOLS

### Workflow
This project uses GitHub Actions for CI/CD. The workflow checks licenses, runs linting, and tests the code on each push and pull request.

### License
The code in this project is licensed under the MIT License. See the LICENSE file for more information.

## Resources
https://github.com/smartcontractkit/hardhat-starter-kit.git (Updated to ethers-v6)

https://github.com/tomhirst/solidity-nextjs-starter.git

```