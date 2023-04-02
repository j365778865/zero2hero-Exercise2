
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("BusinessLogic_v1 (proxy)", function () {
  let businessLogicV1Proxy:Contract
  let businessLogicV2Proxy:Contract

  beforeEach(async function () {
    const BusinessLogicV1 = await ethers.getContractFactory("BusinessLogic_v1");
    const BusinessLogicV2 = await ethers.getContractFactory("BusinessLogic_v2");
    
    //为业务逻辑合约第一个版本生成一个可升级的代理合约,初始分数为100
    businessLogicV1Proxy = await upgrades.deployProxy(BusinessLogicV1, [100], {initializer: 'initialize'});
    //升级业务逻辑合约为第二个版本，BusinessLogic_v2。入参的第一个参数是逻辑合约的代理合约businessLogicV1，第二个参数是需要升级的新的逻辑合约版本
    businessLogicV2Proxy = await upgrades.upgradeProxy(businessLogicV1Proxy.address, BusinessLogicV2);
    })

  it("v2 can use v1 func and proxy address is equle", async function () {    
    console.log(businessLogicV1Proxy.address," businessLogicV1(proxy)， funcs: ",businessLogicV1Proxy.functions); 
    console.log(businessLogicV2Proxy.address," businessLogicV2(proxy)， funcs: ",businessLogicV2Proxy.functions);

    await businessLogicV2Proxy.increment()
    expect(await businessLogicV1Proxy.getScore()).to.equal(BigNumber.from('101'))
    expect(await businessLogicV1Proxy.address).to.equal(businessLogicV2Proxy.address)

  })

})