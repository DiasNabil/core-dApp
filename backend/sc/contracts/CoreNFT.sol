// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoreNFT is Ownable, ERC721URIStorage {

    uint64 private _tokenIds;

    //on initialise une whitelist pour les donateurs 
    mapping(address=>bool) public  hasDonate;

    modifier onlyDonors {
        require(hasDonate[msg.sender], "not allowed to mint");
        _;
    }

    event EtherDeposited(address sender, uint256 amount);
    event EtherWithdrawn(address addr, uint256 amount);
    event Mint(address addr, uint256 tokenId);
    event Registered(address addr);


    constructor()ERC721("CORE NFT", "COR") Ownable(msg.sender) {}

    function approveDonors(address donors) external onlyOwner {
        require(!hasDonate[donors], 'already registered');
        hasDonate[donors] = true;
    }

    function _baseURI() onlyOwner internal view virtual override returns (string memory) {
        return '';//set tokenURI
    }

 
    function mint(string memory tokenURI) external onlyDonors {
        _tokenIds += 1;

        uint64 newTokenId = _tokenIds;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        _tokenIds += 1;

        hasDonate[msg.sender] = false;
        emit Mint(msg.sender, newTokenId);
    }



    receive() external payable {
        emit EtherDeposited(msg.sender, msg.value);
    }

    // si msg.data est vide
    fallback() external payable {
        emit EtherDeposited(msg.sender, msg.value);
    }

    function withdrawEther() external onlyOwner {
        uint256 balance = address(this).balance;

        (bool received, ) = msg.sender.call{value: balance}("");
        require(received, 'An error occurred');
        emit EtherWithdrawn(msg.sender, balance);
    }

}