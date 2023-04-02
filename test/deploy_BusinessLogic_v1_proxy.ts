
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("BusinessLogic_v1 (proxy)", function () {
  let businessLogicProxy:Contract

  beforeEach(async function () {
    const BusinessLogic = await ethers.getContractFactory("BusinessLogic_v1");
        //为业务逻辑合约第一个版本生成一个可升级的代理合约
        businessLogicProxy = await upgrades.deployProxy(BusinessLogic, [42], {initializer: 'initialize'});
    })

  it("should retrieve value previously stored", async function () {    
    console.log(businessLogicProxy.address," businessLogic(proxy)"); 

    expect(await businessLogicProxy.getScore()).to.equal(BigNumber.from('42'));

    await businessLogicProxy.setScore(100)
    expect(await businessLogicProxy.getScore()).to.equal(BigNumber.from('100'));
  })

})