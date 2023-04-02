// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BusinessLogic_v1.sol";

//逻辑合约，第二个版本
contract BusinessLogic_v2 is BusinessLogic_v1 {
    //新增一个获取当前时间戳
    function getCurrentTime() public view returns (uint256) {
        return block.timestamp;
    }

    //将分数加一
    function increment() public {
        setScore(getScore()+1);
    }

}
