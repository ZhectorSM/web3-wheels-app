// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;


interface NftCarInterface {
    function buyCar(uint256 _tokenId, address _buyer, uint256 _payedPrice) external;
    function ownerOf(uint256 tokenId) external view returns (address);
}


contract CarMarket {

    //Events
    event TxEvent(string action, uint256 tokenId);

    NftCarInterface public carInterface;

    constructor(address _NftCarAddress){
          carInterface = NftCarInterface(_NftCarAddress);
    }
   
    function buyCar(uint256 _tokenId) external payable {

        //Original owner
        address originalOwner = carInterface.ownerOf(_tokenId);

        //Transfer the car from owner to buyer(new owner), using the market contract as seller
        carInterface.buyCar(_tokenId, msg.sender, msg.value);

        //transferFunds
        (bool sent, ) = payable (originalOwner).call{value: msg.value}("");
        require(sent, "Failed to emit payment"); 

        //Events
        emit TxEvent("Car sold succesfully", _tokenId);

    }

    //fallback funtion instead of fund (When a function does not exist) - receive / fallback
    receive() external payable {}

    fallback() external payable {}

}