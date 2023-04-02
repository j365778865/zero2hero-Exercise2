import { task } from "hardhat/config";
import { ethers } from "hardhat";
import { readAddressList } from "../scripts/helper";

task("BusinessLogicv1", "exchagne with BusinessLogic v1").setAction(async (_, hre) => {
  
  //和v1 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const businessLogicV1 = await hre.ethers.getContractAt("BusinessLogic_v1", proxyAddress);

  //查看当前的value 值
  let currentScore = await businessLogicV1.getScore()
  console.log("当前值: ", currentScore);

  //设置一个新的value值
  console.log("设置值为16");
  await businessLogicV1.setScore(16)
  console.log("当前值: ", await businessLogicV1.getScore());
});

task("BusinessLogicv2", "exchagne with BusinessLogic v2").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const businessLogicV2 = await hre.ethers.getContractAt("BusinessLogic_v2", proxyAddress);

  //v2 中新增了2个函数  increment / getCurrentTime
  //查看当前的value 值
  console.log("当前值: ", await businessLogicV2.getScore());

  //调用increment 对value+1
  console.log("执行加1操作: ", await businessLogicV2.increment());

  //查看更新后的score 值
  let currentScore = await businessLogicV2.getScore()
  console.log("更新值: ", currentScore);
  console.log("当前值: ", await businessLogicV2.getScore());
  console.log("当前值: ", await businessLogicV2.getScore());
  console.log("当前值: ", await businessLogicV2.getScore());

});

task("BusinessLogicv4", "exchagne with BusinessLogic v4").setAction(async (_, hre) => {
  
  //和v4 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const businessLogicV4 = await hre.ethers.getContractAt("BusinessLogic_v4", proxyAddress);

  //设置学员人数
  console.log("当前总分数: ", await businessLogicV4.getScore());
  console.log("当前学员数: ", await businessLogicV4.getStudentNum());
  await businessLogicV4.setStudentNum(2)
  console.log("更改后学员数: ", await businessLogicV4.getStudentNum());

  //获取平均分
  console.log("平均分: ", await businessLogicV4.getAvagScore());

  
});