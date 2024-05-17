// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./PriceConverter.sol";


enum CarStatus { NEW, FOR_SALE, SOLD }

contract DynamicNFTCar is ERC721, ERC721URIStorage, AccessControl {
 
    modifier onlyCarOwner(uint256 _tokenId) {        
        //Token id validation
        require (_tokenId < _nextTokenId, "TokenId does not exist");//It starts at zero
        //Owner validation
        address carOwner =  _ownerOf(_tokenId);
        require(carOwner == _msgSender(), "Only the Car Owner is allowed to perform this action");
        _;
    }

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using PriceConverter for uint256;
    using Strings for uint256;
    using Strings for uint16;
    using Strings for uint8;

    //Auto-incrementable counter
    uint256 private _nextTokenId;

    //Car obj
    struct Car {
        address owner;
        string name;
        string description;
        string image;       
        string vin; //Vehicle identification number      
        string location;
        uint256 mileage_km;
        uint8 reputation;
        uint256 price_usd; //Could be taken from an API       
        uint256 revenue; //Could be taken from an API
        uint256 expenses;
        CarStatus status;
    }

    //Array of cars
    Car[] public fleet;    

    constructor(address defaultAdmin) ERC721("Web3Wheels", "W3W") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin);
    }


    //Address of the NFT owner, initial URI
    function safeMint(address to, string memory uri) private onlyRole(MINTER_ROLE)  { 
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
        uint256 _price_usd) public onlyRole(MINTER_ROLE)  {
        
        uint256 tokenId = _nextTokenId++;

        fleet.push(Car(to,_name,_description,_image,_vin,_location,0,0,_price_usd,0,0, CarStatus.NEW));

        string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', fleet[tokenId].name, '",'
                        '"description": "', fleet[tokenId].description, '",'
                        '"image": "', fleet[tokenId].image, '",'
                        '"attributes": [',
                            '{"display_type": "number","trait_type": "mileage_km",',
                            '"value": ', fleet[tokenId].mileage_km.toString(),'}',
                            ',{"trait_type": "price_usd",',
                            '"value": ', fleet[tokenId].price_usd.toString(),'}',                           
                            ',{"trait_type": "reputation",',
                            '"value": ', fleet[tokenId].reputation.toString(),'}',
                            ',{"trait_type": "revenue",',
                            '"value": ', fleet[tokenId].revenue.toString(),'}',
                            ',{"trait_type": "expenses",',
                            '"value": ', fleet[tokenId].expenses.toString(),'}',
                            ',{"trait_type": "vin",',
                            '"value": "', fleet[tokenId].vin,'"}',
                            ',{"trait_type": "location",',
                            '"value": "', fleet[tokenId].location,'"}',
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


    //Updates the data from the API call to the backend EOD
    function updateCarEOD(uint256 _tokenId, uint256 _mileage_km, uint8 _reputation, uint256 _expenses, uint256 _revenue) public onlyCarOwner(_tokenId) { 

        //Update data
        fleet[_tokenId].mileage_km = _mileage_km;
        fleet[_tokenId].reputation = _reputation;            
        fleet[_tokenId].expenses += _expenses;
        fleet[_tokenId].revenue += _revenue; 

        updateMetadata(_tokenId);

    }
 
    //Updates the URI of th especified token
    function updateMetadata(uint256 _tokenId) internal onlyCarOwner(_tokenId) {        

         string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', fleet[_tokenId].name, '",'
                        '"description": "', fleet[_tokenId].description, '",'
                        '"image": "', fleet[_tokenId].image, '",'
                        '"attributes": [',
                            '{"display_type": "number","trait_type": "mileage_km",',
                            '"value": ', fleet[_tokenId].mileage_km.toString(),'}',
                            ',{"trait_type": "price_usd",',                           
                            '"value": ', fleet[_tokenId].price_usd.toString(),'}',
                            ',{"trait_type": "reputation",',
                            '"value": ', fleet[_tokenId].reputation.toString(),'}',
                            ',{"trait_type": "revenue",',
                            '"value": ', fleet[_tokenId].revenue.toString(),'}',
                            ',{"trait_type": "expenses",',
                            '"value": ', fleet[_tokenId].expenses.toString(),'}',
                            ',{"trait_type": "vin",',
                            '"value": "', fleet[_tokenId].vin,'"}',
                            ',{"trait_type": "location",',
                            '"value": "', fleet[_tokenId].location,'"}',
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


    // *****Car Market operations*****

    //Function that returns entire fleet
    function getFleet() public view returns (Car[] memory) {        
        return fleet;
    }
    
    //Function to set a car for sale
    function setForSale(uint256 _tokenId, address carMarket, uint256 _listing_price_usd) external onlyCarOwner(_tokenId) {    
        CarStatus carStatus = fleet[_tokenId].status;
        require(carStatus == CarStatus.NEW || carStatus == CarStatus.SOLD, "The car is not available");
        //Approve seller
        approve(carMarket, _tokenId);
        
        //Update data
        fleet[_tokenId].status = CarStatus.FOR_SALE;
        fleet[_tokenId].price_usd = _listing_price_usd;        

        updateMetadata(_tokenId);
    }

    //Could be moved to the market smart contract?(performing here only safeTransferFrom)
    function buyCar(uint256 _tokenId, address _buyer, uint256 _payedPrice) external payable {

        address carMarket = _msgSender();

        //Token id validation
        require (_tokenId < _nextTokenId, "TokenId does not exist");//It starts at zero

        //The cars need to be available
        CarStatus carStatus = fleet[_tokenId].status;
        require(carStatus == CarStatus.FOR_SALE, "The car is not available");

        //Check the amount send is equals o bigger than the car price        
        uint256 usdPayedPrice = _payedPrice.getConversionRate();//Convert ETH to USD
        uint256 carPriceUsd = fleet[_tokenId].price_usd;
        require(carPriceUsd <= usdPayedPrice, "Unable to perform the transaction. Not enough funds");

        //The shop contract need to be approved to transfer the token (Approved after minting calling setForSale)
        require(getApproved(_tokenId) == carMarket, "Shop not approved");

        //Transfer the token    
        address carOwner = _ownerOf(_tokenId);
        safeTransferFrom(carOwner, _buyer, _tokenId);
      
        fleet[_tokenId].owner = _buyer;
        fleet[_tokenId].status = CarStatus.SOLD;
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
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }    

}
