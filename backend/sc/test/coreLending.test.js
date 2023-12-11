
const {expect, assert} = require('chai')
const {ethers} = require('hardhat')
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");





describe('Lending test', function(){
  
  let owner, user1, user2, user3


  let CoreContract
  let TokenContract

    beforeEach(async function() {
        [owner, user1, user2, user3] = await ethers.getSigners()

        const Token = await ethers.getContractFactory('TestToken')
        const token = await Token.deploy(owner, user1,user2, user3)
        
        await token.waitForDeployment();

        console.log('token contract deployed on: ', token.target)

        const Contract = await ethers.getContractFactory('TestLending')
        const contract = await Contract.deploy(token.target)

        await contract.waitForDeployment();
        console.log('core contract deployed on: ', contract.target)

        CoreContract = contract
        TokenContract = token

     })

     describe('deployment', function (){
      it('should set the right owner', async function() {
        expect(await CoreContract.owner()).to.equal(owner.address);
      })


     })


     describe('register', function() {
      it('should not register if not owner', async function() {

        await expect(CoreContract.connect(user1).registerUser(user2.address)).to.be.revertedWithCustomError(CoreContract, 'OwnableUnauthorizedAccount')
      })

    
      it('should not register a user if already registered', async function() {
        CoreContract.connect(owner).registerUser(user1.address)

        expect(CoreContract.connect(owner).registerUser(user1.address)).to.be.revertedWith('Already registered');
      })

      it('should register a user', async function() {
        expect(CoreContract.connect(owner).registerUser(user1.address)).to.emit(CoreContract, 'Registered')
      })
     }) 

      describe('Deposit', function() {

        it('should not deposit if not registered', async function() {
          expect(CoreContract.connect(user1).deposit())
        })
        //it('should not deposit if amount do no exceed 0' async function() {})
        //it('should not deposit if contract is not allowed by addr' async function() {})
      })
})
