// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BusinessLogic_v3.sol";

//逻辑合约，第三个版本，新增一个学生人数
contract BusinessLogic_v4 is BusinessLogic_v3 {
    

    //获取学生平均分
    function getAvagScore() public view returns (uint256) {
        return getScore()/getStdentNum();
    }

}
