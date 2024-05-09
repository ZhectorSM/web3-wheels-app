// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract CarNFT is ERC721, ERC721URIStorage, Ownable {

    using Strings for uint256;
    using Strings for uint16;
    using Strings for uint8;

    //Auto-incrementable counter
    uint256 private _nextTokenId;

    //Car obj
    struct Car {
        string name;
        string description;
        string image;       
        string vin; //Vehicle identification number      
        string location;
        uint256 mileage_km;
        uint8 reputation;
        uint256 price_usdc; //Could be taken from an API
        uint256 profit; //Could be taken from an API
        uint256 expenses;
    }

    //Array of cars
    Car[] public fleet;
    
    constructor(address initialOwner)
        ERC721("Wheel", "W3")
        Ownable(initialOwner)
    {}

    //Address of the NFT owner, initial URI
    function safeMint(address to, string memory uri) public onlyOwner { 
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }    

    //Address of the NFT owner, initial URI
    function safeMintWithValues(address to, 
        string memory _name,       
        string memory _description,
        string memory _image,
        string memory _vin,
        string memory _location,        
        uint256 _mileage_km,
        uint8 _reputation,       
        uint256 _price_usdc) public onlyOwner {             
        
        uint256 tokenId = _nextTokenId++;

        fleet.push(Car(_name,_description,_image,_vin,_location,_mileage_km,_reputation,_price_usdc,0,0));

        string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', fleet[tokenId].name, '",'                        
                        '"description": "fleet[tokenId].description,',
                        '"image": "fleet[tokenId].image,',
                        '"attributes": [',
                            '{"trait_type": "vin",',
                            '"value": ', fleet[tokenId].vin,'}',
                            '{"trait_type": "location",',
                            '"value": ', fleet[tokenId].location,'}',
                            '{"trait_type": "mileage_km",',
                            '"value": ', fleet[tokenId].mileage_km.toString(),'}',
                            ',{"trait_type": "reputation",',
                            '"value": ', fleet[tokenId].reputation.toString(),'}',                            
                            ',{"trait_type": "price_usdc",',
                            '"value": ', fleet[tokenId].price_usdc.toString(),'}',
                            ',{"trait_type": "profit",',
                            '"value": ', fleet[tokenId].profit.toString(),'}',
                            ',{"trait_type": "expenses",',
                            '"value": ', fleet[tokenId].expenses.toString(),'}',                           
                        ']}'
                    )
                )
            )
        );

        // Create token URI
        string memory finalTokenURI = string(
            abi.encodePacked("data:application/json;base64,", uri)
        );         
        
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, finalTokenURI);
    }


    //Updates the URI of th especified token - Arbitrary values
    function updateMetadata(uint256 _tokenId) public {        
        require (_tokenId < _nextTokenId, "tokenId does not exist");//It starts at zero

        //Update dynamic data
        fleet[_tokenId].mileage_km += 200;
        fleet[_tokenId].reputation += 1;       
        fleet[_tokenId].price_usdc -= 100;
        fleet[_tokenId].expenses += 40;

        string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', fleet[_tokenId].name, '",'                        
                        '"description": "fleet[_tokenId].description,',
                        '"image": "fleet[_tokenId].image,',
                        '"attributes": [',
                            '{"trait_type": "vin",',
                            '"value": ', fleet[_tokenId].vin,'}',
                            '{"trait_type": "location",',
                            '"value": ', fleet[_tokenId].location,'}',
                            '{"trait_type": "mileage_km",',
                            '"value": ', fleet[_tokenId].mileage_km.toString(),'}',
                            ',{"trait_type": "reputation",',
                            '"value": ', fleet[_tokenId].reputation.toString(),'}',                            
                            ',{"trait_type": "price_usdc",',
                            '"value": ', fleet[_tokenId].price_usdc.toString(),'}',
                            ',{"trait_type": "profit",',
                            '"value": ', fleet[_tokenId].profit.toString(),'}',
                            ',{"trait_type": "expenses",',
                            '"value": ', fleet[_tokenId].expenses.toString(),'}',                           
                        ']}'
                    )
                )
            )
        );

        // Create token URI
        string memory finalTokenURI = string(
            abi.encodePacked("data:application/json;base64,", uri)
        );
        _setTokenURI(_tokenId, finalTokenURI);       

    }


    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }    

}
