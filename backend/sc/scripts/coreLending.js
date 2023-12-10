
const hre = require("hardhat");


// 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8
// max alloxance 115792089237316195423570985008687907853269984665640564039457584007913119639935
// aUSDC 0x16dA4541aD1807f4443d92D26044C1147406EB80
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const LendingContract = await hre.ethers.getContractFactory("CoreLending");
  const lendingContract = await LendingContract.deploy(
    "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
    "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    "0x16dA4541aD1807f4443d92D26044C1147406EB80"
  );

  await lendingContract.waitForDeployment();

  console.log("LendingContract address:", lendingContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
