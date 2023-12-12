// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20, Ownable {
    uint256 constant initialSupply = 1000000 * (10**6);

    constructor (address _addr1, address _addr2,address _addr3) ERC20('TestToken', 'TST')Ownable(msg.sender){
        _mint(msg.sender, (initialSupply/4));
        _mint(_addr1, (initialSupply/4));
        _mint(_addr2, (initialSupply/4));
        _mint(_addr3, (initialSupply/4));
    }
}