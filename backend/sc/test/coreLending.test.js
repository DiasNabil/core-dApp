const {loadFixture} = require('@nomicfoundation/hardhat-toolbox/network-helpers')
const {expect} = require('chai')
const {ethers} = require('hardhat')





describe('Lending test', function(){
      const MAX_INT = Number.MAX_SAFE_INTEGER

     async function deployContract() {
        [owner, user1, user2, user3] = await ethers.getSigners()

        const Token = await ethers.getContractFactory('TestToken')
        const TokenContract = await Token.deploy( user1,user2, user3)
        
        await TokenContract.waitForDeployment();

        const Contract = await ethers.getContractFactory('TestLending')
        const CoreContract = await Contract.deploy(TokenContract.target)

        await CoreContract.waitForDeployment();

        console.log('core: ' , CoreContract.target, 'test token: ', TokenContract.target)


        return {owner, user1, user2, user3, CoreContract, TokenContract}
     }

     async function deployWithDeposit() {
      [owner, user1, user2, user3] = await ethers.getSigners()

      const Token = await ethers.getContractFactory('TestToken')
      const TokenContract = await Token.deploy(user1,user2, user3)
      
      await TokenContract.waitForDeployment();

      const Contract = await ethers.getContractFactory('TestLending')
      const CoreContract = await Contract.deploy(TokenContract.target)

      await CoreContract.waitForDeployment();

      await CoreContract.connect(owner).registerUser(user2.address)
      await CoreContract.connect(owner).registerUser(user3.address)

      await TokenContract.connect(user2).approve(CoreContract, MAX_INT)
      await CoreContract.connect(user2).deposit((5000*10**6))
      await TokenContract.connect(user3).approve(CoreContract, MAX_INT)
      await CoreContract.connect(user3).deposit((5000*10**6))


      return {owner, user1, user2, user3, CoreContract, TokenContract}
   }

     describe('deployment', function (){
      it('should set the right owner', async function() {
        const {CoreContract, owner} = await loadFixture(deployContract)
        expect(await CoreContract.owner()).to.equal(owner.address);
      })
     })

     describe('register', function() {
      it('should not register if not owner', async function() {
        const {CoreContract, user1, user2} = await loadFixture(deployContract)
        await expect(CoreContract.connect(user1).registerUser(user2.address)).to.be.revertedWithCustomError(CoreContract, 'OwnableUnauthorizedAccount')
      })

    
      it('should not register a user if already registered', async function() {
        const {CoreContract, owner, user1} = await loadFixture(deployContract)

        await CoreContract.connect(owner).registerUser(user1.address)
        await expect(CoreContract.connect(owner).registerUser(user1.address)).to.be.revertedWith('Already registered');
      })

      it('should register a user', async function() {
        const {CoreContract, owner, user1} = await loadFixture(deployContract)
        await expect(CoreContract.connect(owner).registerUser(user1.address)).to.emit(CoreContract, 'Registered')
      })
     }) 

      describe('Deposit', function() {

        it('should not deposit if not registered', async function() {
          const {CoreContract, user1} = await loadFixture(deployContract)
          await expect(CoreContract.connect(user1).deposit((5000*10**6))).to.be.revertedWith("You're not a registered")
        })

        it('should not deposit if amount do not exceed 0', async function() {
          const {CoreContract, owner, user1} = await loadFixture(deployContract)
          await CoreContract.connect(owner).registerUser(user1.address)
          await expect(CoreContract.connect(user1).deposit((0))).to.be.revertedWith('wrong amount')
        })

        it('should not deposit if contract is not allowed by user', async function() {
          const {CoreContract, owner, user1} = await loadFixture(deployContract)

          await CoreContract.connect(owner).registerUser(user1.address)
          await expect(CoreContract.connect(user1).deposit((5000*10**6))).to.revertedWith('Check the token allowance')
        
        })

        it('should deposit amount on the contract', async function() {
          const {CoreContract,TokenContract, owner, user1} = await loadFixture(deployContract)

          await CoreContract.connect(owner).registerUser(user1.address)
          await TokenContract.connect(user1).approve(CoreContract, MAX_INT)
          await expect(CoreContract.connect(user1).deposit((5000*10**6))).to.emit(CoreContract, 'Deposited')
        
        })
      })

      describe('withdraw', function(){
        it('should not withdraw if not registered' , async function (){
          const {CoreContract, user1} = await loadFixture(deployWithDeposit)
          await expect(CoreContract.connect(user1).withdraw((5000*10**6))).to.revertedWith("You're not a registered")
        } )

        it('Should not withdraw if amount do not exceed 0', async function (){
          const {CoreContract, user2} = await loadFixture(deployWithDeposit)
          await expect(CoreContract.connect(user2).withdraw((0))).to.revertedWith("wrong amount")
        })

        it('Should not withdraw if amount exceed balance of user', async function (){
          const {CoreContract, user2} = await loadFixture(deployWithDeposit)
          await expect(CoreContract.connect(user2).withdraw(((15000*10**6)))).to.revertedWith("amount too high")
        })

        it('Should withdraw amount', async function (){
          const {CoreContract, user2,  user3} = await loadFixture(deployWithDeposit)
          await CoreContract.connect(user2).updateInterest(user2)
          expect(await CoreContract.connect(user3).withdraw((5000*10**6))).to.emit(CoreContract, 'Withdraw')
          
        })

      })

      describe('update pool', function() {
        it('should update the pool', async function() {
          const {CoreContract,  user3} = await loadFixture(deployWithDeposit)
          const oldPool = await CoreContract.contractPool()
          await CoreContract.connect(user3).withdraw((5000*10**6))
          await CoreContract.connect(user3).updateInterest(user3)
          const newPool = await CoreContract.contractPool()
          expect(newPool).to.not.be.equal(oldPool)
        })
      })

      describe('receive ether', function(){
        it('should emit when contract receive ether', async function() {
          const {CoreContract,  user3} = await loadFixture(deployContract)
          await expect(user3.sendTransaction({ to: CoreContract, value: 200 })).to.emit(CoreContract, 'EtherDeposited')
        })

        it('should not withdraw ether from the contract if not the owner', async function() {
          const {CoreContract,  user3} = await loadFixture(deployContract)
          await expect(CoreContract.connect(user3).withdrawEther()).to.be.revertedWithCustomError(CoreContract, 'OwnableUnauthorizedAccount')
        })
        it('should withdraw ether from the contract if its the owner', async function() {
          const {CoreContract,  owner} = await loadFixture(deployContract)
          await expect(CoreContract.connect(owner).withdrawEther()).to.be.emit(CoreContract, 'EtherWithdrawn')
        })
      })
        

        


})
