// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
  
enum CarStatus { NEW, FOR_SALE, SOLD }

    //Car obj
    struct Car {
        address owner;
        string name;
        string description;
        string image;       
        string vin; //Vehicle identification number      
        string location;
        uint256 mileage_km;
        uint256 reputation;
        uint256 price_usd;
        uint256 revenue;
        uint256 expenses;
        CarStatus status;
    }

    
