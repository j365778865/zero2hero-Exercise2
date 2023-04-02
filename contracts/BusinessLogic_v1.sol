// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

//逻辑合约，第一个版本，有初始化函数和简单的参数设置可查看
contract BusinessLogic_v1 is Initializable {
    //分数
    uint256 private score;

    event ScoreChanged(uint256 newScore);

    //初始化函数
    function initialize(uint256 _score) public initializer {
        score = _score;
    }

    //设置新的分数值
    function setScore(uint256 _newScore) public {
        score = _newScore;
        emit ScoreChanged(_newScore);
    }

    //获取分数
    function getScore() public view returns (uint256) {
        return score;
    }
}
