# ChainLinker

Demo video link: [https://drive.google.com/drive/folders/1zVeBHvGMAzKKIPGJA7Jmmw8wlDAwieRW](https://drive.google.com/drive/u/1/folders/1zVeBHvGMAzKKIPGJA7Jmmw8wlDAwieRW)

ChainLinker is a Decentralized Application (dApp) focused on businesses, where supply chain's creation and management become a very simple thing. It tracks down products’ path for the final client. 

Inside web3, supply chains can ensure a greater security and reliability in the origin of consumer goods, thus fighting work like slavery, abuse of natural resources and pollutant emissions, among others. The Ethereum Blockchain gather characteristics such as immutability and easy access which companies can guarantee to clients the origin, security and responsibility of their products.

## Overview

The Dapp is divided in two main parts: frontend and backend.

Each part has its own README.md file with more detailed information and instructions, but here is a short description:

### Frontend

The frontend is a ViteJs App using wagmi + rainbowkit. Wagmi uses an Alchemy provider as default, but also has a public provider as well to interact with testnets or even main nets. (Project is configured for Hardhat, Sepolia and Ethereum).

> Obs.: Deploys on testnet can be done, but due to expenses and gas fees, we recommend you to run on Hardhat.

### Backend

Backend part includes four contracts, with deploy.js file pre-configured.
Hardhat is configured to easily deploy localy (on a hardhat node), in the Sepolia Testnet, and, of course, Ethereum Mainnet.
We recommend you to test on Hardhat, but it is also deployed on Sepolia at address: ```0xAddd106316E313E06A50656d0BF5015849bdb8BC```

> Obs.: When deployed the contracts Address and ABI will be updated in frontend files, so if you want to test front-locally pointing to Sepolia remenber to change addressW

# Thank you!
