// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BusinessLogic_v2.sol";

//逻辑合约，第三个版本，新增一个学生人数
contract BusinessLogic_v3 is BusinessLogic_v2 {
    
    uint256 private studentNum;

    event NumChanged(uint256 _studentNum);

    //设置学生人数
    function setStdentNum(uint256 _studentNum) public {
        studentNum = _studentNum;
        emit NumChanged(_studentNum);
    }

    //获取学生人数
    function getStdentNum() public view returns (uint256) {
        return studentNum;
    }

}
