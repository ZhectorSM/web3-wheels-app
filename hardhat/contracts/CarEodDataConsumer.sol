// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface NftCarInterface {
    function updateCarEOD(uint256 _tokenId, uint256 _mileage_km, uint256 _reputation, uint256 _expenses, uint256 _revenue) external;
}


contract CarEodDataConsumer is ChainlinkClient {
  
  using Chainlink for Chainlink.Request;

  NftCarInterface public carInterface;

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

  constructor(address _NftCarAddress) {
    setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
    setChainlinkOracle(0x6c2e87340Ef6F3b7e21B2304D6C057091814f25E);
    externalJobId = "eab9fe9db74f403d967ee207870a943f";
    oraclePayment = ((0 * LINK_DIVISIBILITY) / 10); // n * 10**18
    carInterface = NftCarInterface(_NftCarAddress);
  }

  
  function requestArray(string memory _api, uint256 _mintedTokens)
    public
  {
    for (uint256 i = 0; i < _mintedTokens; i++) {
      
      string memory apiCall = concatenateStrings(_api, Strings.toString(i));

      Chainlink.Request memory req = buildChainlinkRequest(externalJobId, address(this), this.fulfillArray.selector);
      req.add("get", apiCall);
      req.add("path", "stats");
      sendOperatorRequest(req, oraclePayment);      
    }  

  }

  event RequestFulfilledArray(bytes32 indexed requestId, uint256[] _array);

  function fulfillArray(bytes32 requestId, uint256[] memory _array)
    public
    recordChainlinkFulfillment(requestId)
  {
    emit RequestFulfilledArray(requestId, _array);
     
      uint256 tokenId = _array[0];
      //Added to the map as cache (last update)
      CarStats memory carStats = CarStats(_array[1],_array[2],_array[3],_array[4],_array[5]);      
      statsMap[tokenId] = carStats;
      //Update the NFT (tokenId, mileage_km, reputation, expenses, revenue)
      carInterface.updateCarEOD(tokenId,_array[1],_array[2],_array[4],_array[5]);
  }     

   function concatenateStrings(string memory a, string memory b) internal pure returns (string memory) {
        bytes memory bytesA = bytes(a);
        bytes memory bytesB = bytes(b);
        string memory concatenatedString = new string(bytesA.length + bytesB.length);
        bytes memory bytesConcatenated = bytes(concatenatedString);

        uint k = 0;
        for (uint i = 0; i < bytesA.length; i++) {
            bytesConcatenated[k++] = bytesA[i];
        }
        for (uint i = 0; i < bytesB.length; i++) {
            bytesConcatenated[k++] = bytesB[i];
        }

        return string(bytesConcatenated);
    }
   
}
