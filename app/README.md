## Frontend for Web3 Wheels


### Project Description

This frontend application is built using a modern technology stack of Next.js, TailwindCSS, Shadcn, Wagmi, Viem, RainbowKit, and Spline, enabling users to interact seamlessly with the project's blockchain backend and visualize simulations on Leaflet openstreet maps. Additionally, real-time price conversions are fetched via the Dextools API for an enriched user experience. Notably, the user interface incorporates Spline for a captivating 3D model on the main page, fostering a visually engaging and interactive environment.

### Technology Stack

Next.js: A React-based framework for building server-rendered and statically generated web applications.
TailwindCSS: A utility-first CSS framework for rapid development and customization.
Shadcn: A UI component library for consistency and efficiency (if applicable).
Wagmi & Viem: A library for simplified integration with Ethereum wallets and smart contracts.
RainbowKit: A lightweight provider and hooks for integrating with various Ethereum and NFT providers.
Leaflet: An open-source JavaScript library for interactive maps.
Dextools API: Provides real-time price data for cryptocurrencies.
Spline: A 3D design platform for creating engaging 3D models .
### Getting Started

Prerequisites:

Node.js and npm (or yarn (recommended)) installed on your system. You can download them from the official website: https://nodejs.org/en
Clone the Repository:
Use Git to clone the project repository to your local machine:

```Bash
git clone https://github.com/ZhectorSM/web3-wheels-app.git

```
Install Dependencies:
Navigate to the project directory and install all required dependencies:

```Bash
cd app
yarn
``` (or `npm install`)
```

Rename the `.env.example` to `.env`. And paste api keys and contract addresses there.

Run the Development Server:
Start the development server to view the application locally:
```Bash
yarn run dev
``` (or `npm run dev`)
```
This will typically launch the application in your default web browser at `http://localhost:3000`.
