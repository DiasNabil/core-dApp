const {loadFixture} = require('@nomicfoundation/hardhat-toolbox/network-helpers')
const {expect} = require('chai')
const {ethers} = require('hardhat')



//should not register if not the owner 
//should register if owner
//should not register if already register
//should not set base uri if not owner
//should set base uri if its owner
//should not mint if not donors 
//should mint if donors


describe('coreNFT test', function(){

    async function deployContract() {
        [owner, user1, user2, user3] = await ethers.getSigners()

        const NFT = await ethers.getContractFactory('CoreNFT')
        const contract = await NFT.deploy()

        await contract.waitForDeployment()

        await contract.connect(owner).approveDonors(user1)

        return {owner, user1, user2, user3, contract}
    }

    describe('register', function() {
        it('should not register if its not owner', async function(){
            const {contract, user1, user2} = await loadFixture(deployContract)
            await expect(contract.connect(user1).approveDonors(user2)).to.be.revertedWithCustomError(contract,'OwnableUnauthorizedAccount')
        })

        it('should not register if already registered', async function(){
            const {contract, user1} = await loadFixture(deployContract)
            await expect(contract.connect(owner).approveDonors(user1)).to.be.revertedWith('already registered')
        })

        it('should register if its owner', async function() {
            const {contract, user2} = await loadFixture(deployContract)
            await expect(contract.connect(owner).approveDonors(user2)).to.be.emit(contract, 'Registered')
        })

    })

    describe('mint', function() {
        it('should not mint if not donor',async function() {
            const {contract, user2} = await loadFixture(deployContract)
            await expect(contract.connect(user2).mint({uri: 'test'})).to.be.revertedWith('not allowed to mint')
        })
        it('should mint if donor', async function() {
            const{user1, contract} = await loadFixture(deployContract)
            await expect(contract.connect(user1).mint({uri: 'test'})).to.emit(contract, 'Mint')
        })
    })

    describe('receive ether', function(){
        it('should emit when contract receive ether', async function() {
          const {contract,  user3} = await loadFixture(deployContract)
          await expect(user3.sendTransaction({ to: contract, value: 200 })).to.emit(contract, 'EtherDeposited')
        })

        it('should not withdraw ether from the contract if not the owner', async function() {
          const {contract,  user3} = await loadFixture(deployContract)
          await expect(contract.connect(user3).withdrawEther()).to.be.revertedWithCustomError(contract, 'OwnableUnauthorizedAccount')
        })
        it('should withdraw ether from the contract if its the owner', async function() {
          const {contract,  owner} = await loadFixture(deployContract)
          await expect(contract.connect(owner).withdrawEther()).to.be.emit(contract, 'EtherWithdrawn')
        })
      })
})