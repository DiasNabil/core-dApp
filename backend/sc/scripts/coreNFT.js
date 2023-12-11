const hre = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const coreNFTContract = await hre.ethers.deployContract('CoreNFT');

  await coreNFTContract.waitForDeployment();

  console.log("coreNFT Contract address:", coreNFTContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});