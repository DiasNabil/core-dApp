const {loadFixture} = require('@nomicfoundation/hardhat-toolbox/network-helpers')
const {expect, assert} = require('chai')
const {ethers} = require('hardhat')
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");




describe('Lending test', function(){
  
  let owner, user1, user2, user3

  const poolAddress = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951'
  const tokenAddress = '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'
  const aUsdcAddress = '0x16dA4541aD1807f4443d92D26044C1147406EB80'

  let CoreContract

    beforeEach(async function() {
        [owner, user1, user2, user3] = await ethers.getSigners()

        const Contract = await ethers.getContractFactory('CoreLending')
        const contract = await Contract.deploy(
            poolAddress,
            tokenAddress,
            aUsdcAddress
        )

        await contract.waitForDeployment();

        CoreContract = contract


        await owner.sendTransaction({
          to: contract.target,
          value: ethers.parseEther("0.002"),
        });

     })


     describe('register', function() {
      it('should not register if not owner', async function() {

        expect(CoreContract.connect(user1).registerUser(user2.address)).to.be.reverted
      })
    
      //it('should not register a user if already registered', async function() {
      //  CoreContract.connect(owner).registerUser(user1.address)

      //  expect(CoreContract.connect(owner).registerUser(addr1.address)).to.be.revertedWith('Already registered');
     // })
      //it('should register a user', async function() {
      //  expect(CoreContract.connect(owner).registerUser(user1.address)).to.emit(contract, 'Registered')
     // })
     }) 

      describe('Deposit', function() {

        //it('should not deposit if not registered' async function() {})
        //it('should not deposit if amount do no exceed 0' async function() {})
        //it('should not deposit if contract is not allowed by addr' async function() {})
      })
})