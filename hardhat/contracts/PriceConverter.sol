// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    
    /**    
     *
     * ETH in terms of USD 
     * 
     * Network: Sepolia
     * Aggregator: ETH/USD
     * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    function getPrice() public view returns (uint256) {  
        AggregatorV3Interface dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);//Init datafeed      
        (, int256 answer,,,) = dataFeed.latestRoundData(); // Getting price from chainlink feed //2007.43623731 (8 decimals)        
        return uint256(answer * 1e10);
    }
    
    //Returns the value of ETH in USD
    function getConversionRate(uint _ethAmount) public view returns (uint){
        return (getPrice() * _ethAmount) / 1e18; // Result 36 zeros we divided to get only 18 zeros
    }

}