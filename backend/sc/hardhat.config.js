require("@nomicfoundation/hardhat-toolbox");
require('@nomicfoundation/hardhat-viem')
require('dotenv').config()
// /!\ 
require("@nomicfoundation/hardhat-verify");
// /!\ 

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const owner = process.env.OWNER || "";
const user1 = process.env.ADDR1 || "";
const user2 = process.env.ADDR2 || "";
const user3 = process.env.ADDR3 || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    sepolia:{
      url: SEPOLIA_RPC_URL,
      accounts: [owner, user1, user2, user3]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
  },
  sourcify: {
    enabled: true
  },
  solidity: "0.8.20",
};