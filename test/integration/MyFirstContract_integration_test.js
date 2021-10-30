const { expect } = require('chai');
const chai = require('chai');
const BN = require('bn.js');
const { ethers } = require('hardhat');

// Enable and inject BN dependency
chai.use(require('chai-bn')(BN));

describe('MyFirstContract Integration Test', () => {
    before(async () => {
        MyFirstContract = await ethers.getContractFactory('MyFirstContract')
        myFirstContract = await MyFirstContract.deploy('0x9326BFA02ADD2366b30bacB125260Af641031331')
        await myFirstContract.deployed()
    })

    beforeEach(async () => {
        await myFirstContract.setNumber(0)
    })

    it('Price feed value greater than 0', async () => {
        let result = await myFirstContract.getLatestPrice()
        console.log('price: ' + new ethers.BigNumber.from(result._hex).toString())
        expect((new ethers.BigNumber.from(result._hex).toString())).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from('0').toString())
    })

})
