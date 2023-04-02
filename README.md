# zero2hero-Exercise2



v1版本部署
```shell
npx hardhat run scripts/scripts/deploy_BusinessLogic_v1.ts --network bnbtest
```
与v1版本交互
```shell
npx hardhat BusinessLogicv1 --network bnbtest
```
升级v2
```shell
npx hardhat run scripts/scripts/deploy_BusinessLogic_v2.ts --network bnbtest
```
与v2版本交互
```shell
npx hardhat BusinessLogicv2 --network v
```

升级v4
```shell
npx hardhat run scripts/scripts/deploy_BusinessLogic_v4.ts --network localhost
```
与v4版本交互
```shell
npx hardhat BusinessLogicv4 --network v
```
