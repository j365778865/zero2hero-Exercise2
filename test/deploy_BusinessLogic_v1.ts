// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("BusinessLogic_v1 Deploy", function () {
  let logicV1:Contract;

  beforeEach(async function () {
    //部署第一个版本的业务逻辑合约
    const LogicV1 = await ethers.getContractFactory("BusinessLogic_v1");
    logicV1 = await LogicV1.deploy();
    await logicV1.deployed();
  })

  it("score shoule be set by params", async function () {
    await logicV1.setScore(1);
    expect(await logicV1.getScore()).to.equal(BigNumber.from('1'));

    await logicV1.setScore(2);
    expect(await logicV1.getScore()).to.equal(BigNumber.from('2'));
  })
})