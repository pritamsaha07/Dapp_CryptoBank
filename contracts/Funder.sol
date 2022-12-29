// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Funder{
  uint public numofffunders;

  mapping(uint=>address) private funders;

  receive() external payable{} 
  function transfer() external payable{
    funders[numofffunders]=msg.sender;

  }
  function withdraw(uint withdrawamount) external{
    require(withdrawamount<=2000000000000000000,"Can't withdraw more than 2 Ether");
    payable(msg.sender).transfer(withdrawamount); 
     
  }


}