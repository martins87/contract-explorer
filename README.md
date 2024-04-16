# Contract Explorer

## 1. Description

The application is a simple contract explorer that lets users interact with a contract deployed to the mainnet.
Once the user inputs the contract's address and ABI (via a JSON file) he/she can interact with its functions.

## 2. Project decisions

- Frontend library: [React](https://reactjs.org/) and [Next.js](https://nextjs.org/)
- Web3 Eth library: [ethers.js (v6)](https://docs.ethers.org/v6/)
- Styled components and icons: [Material UI](https://mui.com/)
- State-management solution: [Zustand](https://github.com/pmndrs/zustand)

## 3. Getting Started

### Installing

Clone the repository and run in the project directory:

`npm install`

Add an Infura key to the file next.config.js as follows:

```
module.exports = {
  env: {
    INFURA_API_KEY:  "xyz",
  },
};
```

Run:

`npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 4. Built With

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Zustand](https://github.com/pmndrs/zustand)

## 5. Possible improvements

### What I would improve if I had more time

- Write functions (only a signer missing to have it owrking)
- Different Tabs for read and write contract functions
- Pages and components more modular
- Overall application styling
- Robust error handling
- Exception handling when interacting with contract
- More responsiveness
- Reset button on load contract page
