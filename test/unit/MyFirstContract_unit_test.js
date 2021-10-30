const { expect } = require('chai');

describe('MyFirstContract Unit Test', () => {
    before(async () => {
        MyFirstContract = await ethers.getContractFactory('MyFirstContract')
        myFirstContract = await MyFirstContract.deploy()
        await myFirstContract.deployed()
    })

    beforeEach(async () => {
        await myFirstContract.setNumber(0)
    })

    it('Initial value is set to 0', async () => {
        expect((await myFirstContract.getNumber()).toString()).to.equal('0')
    })

    it('Retrieve returns a value previously stored', async () => {
        await myFirstContract.setNumber(33)
        expect((await myFirstContract.getNumber()).toString()).to.equal('33')
    })

})
