# ChainLinker Frontend 

## First steps

There is a few things you gotta do to prepare you computer to run this part:

### env file
Basically we have 3 main enviroment variables here:

- **ALCHEMY_API_KEY**: Here you can put the Alchemy API Key for using it's provider
- **PROJECT_ID**: This one is needed for wallet connection, you can get one for free and quickly through [walletconnect](cloud.walletconnect.com)

### Installing dependencies

As simple as any node project: run ```npm install``` and wait.

## How to run it?

On this section we are going to cover the commands to run the different scenarios.

### Locally

Just go with classic ```npm run dev``` and go for it.

### Building and Deploying

Here we have a trick. Wagmi sometimes give an error related to 'globalThis' while building and/or deploying your Dapp, we are working on a definive solution, but for now you can see inside the ```vite.config.ts``` file two definitions for global, the one commented out solves the problem for building, but you cannot use it for local developing, so use the default for developing and change de global definition once you want to build and/or deploy it.

To build just run ```npm run dev```, and for deploy we highly recommend using Vercel, 'cause it's free and fast, their plataform have a nice wizard for deploying Vite apps.

## What's included?

### Wagmi + RainbowKit

This modules are responsible for connecting with your wallet (RainbowKit) and interacting with smart contracts by using hooks (Wagmi). Feel free to look into their documentations for more detalied information.

### MaterialUI

Looking for quick and easy development we added MaterialUI so you can focus more on your product and less on small CSS details, you can also check their documentation for all components and it's variations availiable, but also this Dapp it self has a simple interface made with the module that you can use as an example.

## How do I work fullstack locally?

Everything is already setup once you have both back and frontend running, the deploy script for backend already updates the contract configuration for the frontend everytime it's needed. We have a simple form coded which interact with the contract deployed on Hardhat that you can use as an example.
