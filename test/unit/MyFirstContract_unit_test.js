const { expect } = require('chai');

const chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN))

const DECIMALS='18'
const INITIAL_PRICE='2000000000000000000000'

describe('MyFirstContract Unit Test', () => {
    before(async () => {
        MockV3Aggregator = await ethers.getContractFactory('MockV3Aggregator')
        mockV3Aggregator = await MockV3Aggregator.deploy(DECIMALS, INITIAL_PRICE)
        await mockV3Aggregator.deployed()
        
        MyFirstContract = await ethers.getContractFactory('MyFirstContract')
        myFirstContract = await MyFirstContract.deploy(mockV3Aggregator.address)
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

    it('gets a price feed value', async () => {
        let result = await myFirstContract.getLatestPrice()
        console.log('price: ' + new ethers.BigNumber.from(result._hex).toString())
        expect((new ethers.BigNumber.from(result._hex).toString())).equal(INITIAL_PRICE).toString()
    })
})
