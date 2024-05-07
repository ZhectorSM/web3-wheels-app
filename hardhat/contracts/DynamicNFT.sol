// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Wheel1 is ERC721, ERC721URIStorage, Ownable {

    using Strings for uint256;

    //Auto-incrementable counter
    uint256 public _nextTokenId;

    //Car obj
    struct Car {
        string name;
        string image;
        string description;
        string year;
        uint256 mileage_km;
        uint256 reputation;
        uint256 maintenance;
        uint256 price_wei;
        string color;
    }

    //Array of cars
    Car[] public fleet;
    
    constructor(address initialOwner)
        ERC721("Wheel1", "W3")
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
        string memory _image,
        string memory _description,
        string memory _year,
        uint256 _mileage_km,
        uint256 _reputation,
        uint256 _maintenance,
        uint256 _price_wei,
        string memory _color) public onlyOwner {             
        
        uint256 tokenId = _nextTokenId++;

        fleet.push(Car(_name,_image,_description,_year,_mileage_km,_reputation,_maintenance,_price_wei,_color));

        string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', fleet[tokenId].name, '",'
                        '"description": "fleet[tokenId].description,',
                        '"image": "fleet[tokenId].image,',
                        '"year": "', fleet[tokenId].year, '",'
                        '"attributes": [',
                            '{"trait_type": "mileage_km",',
                            '"value": ', fleet[tokenId].mileage_km.toString(),'}',
                            ',{"trait_type": "reputation",',
                            '"value": ', fleet[tokenId].reputation.toString(),'}',
                            ',{"trait_type": "maintenance",',
                            '"value": ', fleet[tokenId].maintenance.toString(),'}',
                            ',{"trait_type": "price_wei",',
                            '"value": ', fleet[tokenId].price_wei.toString(),'}',
                            ',{"trait_type": "color",',
                            '"value": ', fleet[tokenId].color,'}',
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
        fleet[_tokenId].mileage_km += 10;
        fleet[_tokenId].reputation += 1;
        //fleet[_tokenId].maintenance += 1;
        fleet[_tokenId].price_wei -= 500;

        string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', fleet[_tokenId].name, '",'
                        '"image": "', fleet[_tokenId].description, '",'
                        '"image": "', fleet[_tokenId].image, '",'
                        '"year": "', fleet[_tokenId].year, '",'
                        '"attributes": [',
                            '{"trait_type": "mileage_km",',
                            '"value": ', fleet[_tokenId].mileage_km.toString(),'}',
                            ',{"trait_type": "reputation",',
                            '"value": ', fleet[_tokenId].reputation.toString(),'}',
                            ',{"trait_type": "maintenance",',
                            '"value": ', fleet[_tokenId].maintenance.toString(),'}',
                            ',{"trait_type": "price_wei",',
                            '"value": ', fleet[_tokenId].price_wei.toString(),'}',
                            ',{"trait_type": "color",',
                            '"value": ', fleet[_tokenId].color,'}',
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
