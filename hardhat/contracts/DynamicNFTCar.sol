// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./PriceConverter.sol";
import "./NFTStorage.sol";
    

contract DynamicNFTCar is ERC721, ERC721URIStorage, AccessControl {
 
    modifier onlyCarOwner(uint256 _tokenId) {        
        //Token id validation
        require (_tokenId < _nextTokenId, "TokenId does not exist");//It starts at zero
        //Owner validation
        address carOwner =  _ownerOf(_tokenId);
        require(carOwner == _msgSender(), "Not authorized. CarOwner only");
        _;
    }

    //Events
    event CarEvent(string action, Car car);

    //Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using PriceConverter for uint256;
    using Strings for uint256;   

    //Auto-incrementable counter
    uint256 private _nextTokenId;    

    //Array of cars
    Car[] public fleet;    

    constructor(address defaultAdmin) ERC721("Web3Wheels", "W3W") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin);
    }
   
    //Address of the NFT owner, initial URI
    function safeMintWithValues(address to, 
        string memory _name,       
        string memory _description,
        string memory _image,
        string memory _vin,
        string memory _location,       
        uint256 _price_usd) public onlyRole(MINTER_ROLE)  {
              
        fleet.push(Car(to,_name,_description,_image,_vin,_location,0,0,_price_usd,0,0, CarStatus.NEW));
       
        uint256 tokenId = _nextTokenId;
        string memory uri = _createTokenURI(fleet[tokenId]);
        _safeMintWithURI(to, uri);

    }


    // Mint function with initial URI (private as it's used internally)
    function _safeMintWithURI(address to, string memory uri) private onlyRole(MINTER_ROLE) {    
        uint256 tokenId = _nextTokenId;
        _safeMint(to, tokenId);//Need to do -1 because it was incresed already in the mint method
        _setTokenURI(tokenId, uri);          
        _nextTokenId++;               

        emit CarEvent("Minted car", fleet[tokenId]);
    }

    //Updates the data from the API call to the backend EOD
    function updateCarEOD(uint256 _tokenId, uint256 _mileage_km, uint256 _reputation, uint256 _expenses, uint256 _revenue) public onlyCarOwner(_tokenId) { 

        //Update data
        Car storage car = fleet[_tokenId];
        car.mileage_km = _mileage_km;
        car.reputation = _reputation;
        car.expenses += _expenses;
        car.revenue += _revenue;

        string memory uri = _createTokenURI(car);
        _setTokenURI(_tokenId, uri);

        emit CarEvent("Updated car EOD", fleet[_tokenId]);
    }
 
 
     // Function to create the token URI
    function _createTokenURI(Car memory car) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"', car.name, '",',
                            '"description":"', car.description, '",',
                            '"image":"', car.image, '",',
                            '"attributes":[{"trait_type":"mileage_km","value":"', car.mileage_km.toString(), '"},',
                            '{"trait_type":"price_usd","value":"', car.price_usd.toString(), '"},',
                            '{"trait_type":"reputation","value":"', car.reputation.toString(), '"},',
                            '{"trait_type":"revenue","value":"', car.revenue.toString(), '"},',
                            '{"trait_type":"expenses","value":"', car.expenses.toString(), '"},',
                            '{"trait_type":"status","value":"', uint(car.status).toString(), '"},',
                            '{"trait_type":"vin","value":"', car.vin, '"},',
                            '{"trait_type":"location","value":"', car.location, '"}]}'
                        )
                    )
                )
            )
        );
    }


    // *****Car Market operations*****

    //Function that returns entire fleet
    function getFleet() public view returns (Car[] memory) {        
        return fleet;
    }
    
    //Function to set a car for sale
    function setForSale(uint256 _tokenId, address carMarket, uint256 _listing_price_usd) external onlyCarOwner(_tokenId) {    
        Car storage car = fleet[_tokenId];

        require(car.status == CarStatus.NEW || car.status == CarStatus.SOLD, "Car not available");
        //Approve seller
        approve(carMarket, _tokenId);
        
        //Update data
        car.status = CarStatus.FOR_SALE;
        car.price_usd = _listing_price_usd;        

        string memory uri = _createTokenURI(car);
        _setTokenURI(_tokenId, uri);

        emit CarEvent("Car for sale", fleet[_tokenId]);
    }

    //Could be moved to the market smart contract?(performing here only safeTransferFrom)
    function buyCar(uint256 _tokenId, address _buyer, uint256 _payedPrice) external payable {

        address carMarket = _msgSender();

        //Token id validation
        require (_tokenId < _nextTokenId, "TokenId does not exist");//It starts at zero
         
        Car storage car = fleet[_tokenId];

        //The cars need to be available
        require(car.status == CarStatus.FOR_SALE, "Car not available");

        //Check the amount send is equals o bigger than the car price
        uint256 usdPayedPrice = _payedPrice.getConversionRate();//Convert ETH to USD        
        require(car.price_usd <= usdPayedPrice, "Not enough funds");

        //The shop contract need to be approved to transfer the token (Approved after minting calling setForSale)
        require(getApproved(_tokenId) == carMarket, "Shop not approved");

        //Transfer the token    
        address carOwner = _ownerOf(_tokenId);
        safeTransferFrom(carOwner, _buyer, _tokenId);
      
        car.owner = _buyer;
        car.status = CarStatus.SOLD;

        emit CarEvent("Car ownership transfered", fleet[_tokenId]);
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
