
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";
const addressList = readAddressList();
const proxy = addressList["proxy"];
async function main() {
  
  console.log("Origin Proxy Address: ", proxy);
  const BusinessLogicV3 = await ethers.getContractFactory("BusinessLogic_v3")
  console.log("Upgrade BusinessLogicV3...")
  
  //升级新的业务逻辑合约 v3版本  预期是proxy合约和adminProxy合约地址不变
  const businessLogicV3Proxy = await upgrades.upgradeProxy(proxy,BusinessLogicV3)

  await businessLogicV3Proxy.deployed();
  console.log("businessLogicV3(proxy) address: ",businessLogicV3Proxy.address)

  const admin = await upgrades.erc1967.getAdminAddress(businessLogicV3Proxy.address);

  console.log("BusinessLogicV3Proxy AdminAddress: ",admin);

  const implementation = await upgrades.erc1967.getImplementationAddress(businessLogicV3Proxy.address);

  console.log("BusinessLogicV3Proxy ImplementationAddress", implementation)

  const addressList = readAddressList();

  addressList['proxyV3'] = businessLogicV3Proxy.address;
  addressList['adminV3'] = admin;
  addressList['implementationV3'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})