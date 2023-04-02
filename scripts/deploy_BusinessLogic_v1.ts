
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

async function main() {

  const BusinessLogicV1 = await ethers.getContractFactory("BusinessLogic_v1")
  console.log("Deploying BusinessLogicV1...")
  
  //部署合约  部署了三个合约，  从底层到外层分别是 业务逻辑合约（具体逻辑实现合约ImplementationAddress）;  代理合约proxy ;  代理合约管理合约  proxyAdmin ;
  const businessLogicV1Proxy = await upgrades.deployProxy(BusinessLogicV1,[100], { initializer: 'initialize' })

  await businessLogicV1Proxy.deployed();
  console.log("businessLogicV1(proxy) address: ",businessLogicV1Proxy.address)

  const admin = await upgrades.erc1967.getAdminAddress(businessLogicV1Proxy.address);

  console.log("BusinessLogicV1Proxy AdminAddress: ",admin);

  const implementation = await upgrades.erc1967.getImplementationAddress(businessLogicV1Proxy.address);

  console.log("BusinessLogicV1Proxy ImplementationAddress", implementation)

  const addressList = readAddressList();

  addressList['proxy'] = businessLogicV1Proxy.address;
  addressList['admin'] = admin;
  addressList['implementation'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})