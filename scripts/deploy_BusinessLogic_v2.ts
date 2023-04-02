
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";
const addressList = readAddressList();
const proxy = addressList["proxy"];
async function main() {
  
  console.log("Origin Proxy Address: ", proxy);
  const BusinessLogicV2 = await ethers.getContractFactory("BusinessLogic_v2")
  console.log("Upgrade BusinessLogicV2...")
  
  //升级新的业务逻辑合约 v2版本  预期是proxy合约和adminProxy合约地址不变
  const businessLogicV2Proxy = await upgrades.upgradeProxy(proxy,BusinessLogicV2)

  await businessLogicV2Proxy.deployed();
  console.log("businessLogicV2(proxy) address: ",businessLogicV2Proxy.address)

  const admin = await upgrades.erc1967.getAdminAddress(businessLogicV2Proxy.address);

  console.log("BusinessLogicV2Proxy AdminAddress: ",admin);

  const implementation = await upgrades.erc1967.getImplementationAddress(businessLogicV2Proxy.address);

  console.log("BusinessLogicV2Proxy ImplementationAddress", implementation)

  const addressList = readAddressList();

  addressList['proxyV2'] = businessLogicV2Proxy.address;
  addressList['adminV2'] = admin;
  addressList['implementationV2'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})