// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoreLending is Ownable {
    using SafeERC20 for IERC20;

    struct UserInfo {
        uint256 depositedAmount;
        uint256 userRewards;
        bool isRegistered;
    }

    address tokenAddress;
    address lendingTokenAddress;
    address lendingPoolAddress;

    mapping(address => UserInfo) public userInfo;

    uint256 public contractPool;

    // Événements lorsqu'un utilisateur s'enregistre/dépose/retire des fonds
    event Registered(address indexed user, UserInfo info);
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    // Événement en cas d'envoi d'ether vers le contrat
    event EtherDeposited(address sender, uint256 amount);
    event EtherWithdrawn(address addr, uint256 amount);

    
    constructor(address _lendingPool, address _token, address _lendingToken) Ownable(msg.sender) {
        lendingPoolAddress = _lendingPool;
        tokenAddress = _token;
        lendingTokenAddress = _lendingToken;

        // Approuve la pool Aave afin de déplacer des fonds depuis le contrat
        IERC20(tokenAddress).approve(lendingPoolAddress, type(uint256).max);
    }

    modifier onlyRegistered() {
        if(!userInfo[msg.sender].isRegistered) {revert ("You're not a registered");}
        else {
            _;
        }
    }

    function registerUser(address user) external onlyOwner {
        require(!userInfo[user].isRegistered, 'Already registered');

        userInfo[user].isRegistered = true;
        emit Registered(user, userInfo[user]);
    }



    /// @dev envoie les fonds de l'utilisateur vers le contrat puis le contrat se charge de mettre en lending dans le pool Aave
    /// @param amount montant envoyé par l'utilisateur 
    function deposit(uint256 amount) external onlyRegistered {
        require (amount > 0, "wrong amount");

        //allowance a set coté front pour chaque utilisateur, au moment de l'inscription ? 
        //c'est le caller qui doit appeler la fonction approve manuellement 
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        IPool(lendingPoolAddress).supply(tokenAddress, amount, address(this), 0);

        userInfo[msg.sender].depositedAmount += amount;
        contractPool += amount; 

        emit Deposited(msg.sender, amount);
    }

    /// @dev permet de retirer les fonds de l'utilisateur bloqués dans le pool Aave
    /// @param amount le montant que souhaite retirer l'utilisateur
    function withdraw(uint256 amount) external onlyRegistered {
        require (amount > 0, "wrong amount");
        require (amount <= userInfo[msg.sender].depositedAmount+userInfo[msg.sender].userRewards, "amount too high");
        
        IPool(lendingPoolAddress).withdraw(tokenAddress, amount, msg.sender);


        if(amount < userInfo[msg.sender].userRewards){
            userInfo[msg.sender].userRewards -= amount;
        }else {

            userInfo[msg.sender].userRewards = 0;
            userInfo[msg.sender].depositedAmount -= (amount-userInfo[msg.sender].userRewards);

        }

        contractPool -= amount;
        emit Withdrawn(msg.sender, amount);
    }

    /// @dev par souci d'optimisation boucler en dehors du smart contract pour mettre les données constamment à jour ? 
    /// @param user adresse de l'utilisateur à mettre à jour
    function updateInterest(address user) public {
         require (userInfo[user].isRegistered || owner() == msg.sender || address(this) == msg.sender , "you can't !");
        uint256 updatedPool = IERC20(lendingTokenAddress).balanceOf(address(this));
        uint256 interestPool = updatedPool - contractPool;

        uint256 percentage = ((userInfo[user].depositedAmount + userInfo[user].userRewards) / contractPool) * 100;
        uint256 reward = interestPool == 0 ? 0 : (interestPool * percentage) / 100;

        userInfo[user].userRewards += reward; 
        contractPool = updatedPool; 
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
