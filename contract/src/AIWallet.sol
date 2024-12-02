// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract AIWallet {
    address public owner;
    address public aiAgent;
    
    // Mapping to track user deposits
    mapping(address => uint256) public userDeposits;
    
    // Events
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event AIAgentSet(address indexed oldAgent, address indexed newAgent);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAIAgent() {
        require(msg.sender == aiAgent, "Only AI agent can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // Owner can set or update AI agent address
    function setAIAgent(address _aiAgent) external onlyOwner {
        require(_aiAgent != address(0), "Invalid AI agent address");
        address oldAgent = aiAgent;
        aiAgent = _aiAgent;
        emit AIAgentSet(oldAgent, _aiAgent);
    }
    
    // Users can deposit ETH
    function deposit() external payable {
        require(msg.value > 0, "Must deposit some ETH");
        userDeposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    // AI agent can return funds to original depositor
    function aiReturnFunds(address user, uint256 amount) external onlyAIAgent {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= userDeposits[user], "Cannot return more than user deposited");
        require(address(this).balance >= amount, "Insufficient contract balance");
        
        userDeposits[user] -= amount;
        (bool success, ) = user.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(user, amount);
    }
    
    // Owner can withdraw any amount
    function ownerWithdraw(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient contract balance");
        
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(owner, amount);
    }
    
    // View functions
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function getUserDeposit(address user) external view returns (uint256) {
        return userDeposits[user];
    }
    
    // Allow contract to receive ETH
    receive() external payable {
        require(msg.value > 0, "Must deposit some ETH");
        userDeposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    fallback() external payable {
        require(msg.value > 0, "Must deposit some ETH");
        userDeposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
} 