import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import '@openzeppelin/hardhat-upgrades';

import * as dotenv from "dotenv";
dotenv.config();

import "./tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  // Default network when you don't specify "--network {network_name}"
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
    },
    bnbtest: {
      url: process.env.BNBTest_URL,
      accounts:  process.env.BNBTest_MNEMONIC !== undefined
      ? [process.env.BNBTest_MNEMONIC]
      : [],
      chainId: 97,
      gasPrice: 20000000000,
      // url: process.env.BNBTest_URL,
      },
  },
  mocha: {
    timeout: 200000,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
