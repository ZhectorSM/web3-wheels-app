// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract CarEodDataConsumer is ChainlinkClient, ConfirmedOwner {
  
  using Chainlink for Chainlink.Request;

     //Car obj
  struct CarStats {  
    uint256 mileage_km;
    uint256 reputation;
    uint256 price_usd;
    uint256 revenue;
    uint256 expenses;      
  }

  //Array of stats of the cars
  //tokenId => CarStats
  mapping(uint256 => CarStats) public statsMap;

  bytes32 private externalJobId;
  uint256 private oraclePayment;

  constructor() ConfirmedOwner(msg.sender){
    setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
    setChainlinkOracle(0x6c2e87340Ef6F3b7e21B2304D6C057091814f25E);
    externalJobId = "eab9fe9db74f403d967ee207870a943f";
    oraclePayment = ((0 * LINK_DIVISIBILITY) / 10); // n * 10**18
  }

  /**
   * Method to request the data from an external api as param
   * @param api "https://web3-wheels-service.vercel.app/vehicles/4"
   * {"data":[4,32480,6,36000,98,17]}
   */
  function requestArray(string memory api)
    public    
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(externalJobId, address(this), this.fulfillArray.selector);
    req.add("get", api);
    req.add("path", "data");
    sendOperatorRequest(req, oraclePayment);
  }

  event RequestFulfilledArray(bytes32 indexed requestId, uint256[] _array);

  function fulfillArray(bytes32 requestId, uint256[] memory _array)
    public
    recordChainlinkFulfillment(requestId)
  {
    emit RequestFulfilledArray(requestId, _array);
     
      uint256 tokenId = _array[0];
      CarStats memory carStats = CarStats(_array[1],_array[2],_array[3],_array[4],_array[5]);      
      statsMap[tokenId] = carStats;
  }     

   
}
