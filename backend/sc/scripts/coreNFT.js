const hre = require("hardhat");


async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CoreNFTContract = await hre.ethers.getContractFactory("CoreNFT");
  const coreNFTContract = await CoreNFTContract.deploy();

  await coreNFTContract.waitForDeployment();

  console.log("coreNFT Contract address:", coreNFTContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});