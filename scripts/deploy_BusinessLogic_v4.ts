
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";
const addressList = readAddressList();
const proxy = addressList["proxy"];
async function main() {
  
  console.log("Origin Proxy Address: ", proxy);
  const BusinessLogicV4 = await ethers.getContractFactory("BusinessLogic_v4")
  console.log("Upgrade BusinessLogicV4...")
  
  //升级新的业务逻辑合约 v3版本  预期是proxy合约和adminProxy合约地址不变
  const businessLogicV4Proxy = await upgrades.upgradeProxy(proxy,BusinessLogicV4)

  await businessLogicV4Proxy.deployed();
  console.log("businessLogicV4(proxy) address: ",businessLogicV4Proxy.address)

  const admin = await upgrades.erc1967.getAdminAddress(businessLogicV4Proxy.address);

  console.log("BusinessLogicV4Proxy AdminAddress: ",admin);

  const implementation = await upgrades.erc1967.getImplementationAddress(businessLogicV4Proxy.address);

  console.log("BusinessLogicV4Proxy ImplementationAddress", implementation)

  const addressList = readAddressList();

  addressList['proxyV4'] = businessLogicV4Proxy.address;
  addressList['adminV4'] = admin;
  addressList['implementationV4'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})