import { expect } from 'chai';
// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("BusinessLogic_v2 Deploy", function () {
  let logicV2: Contract;

  beforeEach(async function () {
    //部署第一个版本的业务逻辑合约
    const LogicV2 = await ethers.getContractFactory("BusinessLogic_v2");
    logicV2 = await LogicV2.deploy();
    await logicV2.deployed();
  })

  it("score shoule be add 1", async function () {
    await logicV2.setScore(1);
    let oldScoreStr = await logicV2.getScore();
    let expectScore = BigNumber.from(oldScoreStr).add(1);
    await logicV2.increment();
    expect(await logicV2.getScore()).to.equal(expectScore);
  })
})


