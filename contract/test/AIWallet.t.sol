// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {AIWallet} from "../src/AIWallet.sol";

contract AIWalletTest is Test {
    AIWallet public wallet;
    address public owner;
    address public aiAgent;
    address public user1;
    address public user2;
    
    uint256 public constant INITIAL_BALANCE = 100 ether;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event AIAgentSet(address indexed oldAgent, address indexed newAgent);
    
    function setUp() public {
        owner = makeAddr("owner");
        aiAgent = makeAddr("aiAgent");
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        
        // Fund test addresses
        vm.deal(user1, INITIAL_BALANCE);
        vm.deal(user2, INITIAL_BALANCE);
        
        // Deploy contract as owner
        vm.prank(owner);
        wallet = new AIWallet();
    }
    
    // Constructor tests
    function test_Constructor() public {
        assertEq(wallet.owner(), owner);
        assertEq(wallet.aiAgent(), address(0));
    }
    
    // AI Agent tests
    function test_SetAIAgent() public {
        vm.prank(owner);
        vm.expectEmit(true, true, false, false);
        emit AIAgentSet(address(0), aiAgent);
        wallet.setAIAgent(aiAgent);
        assertEq(wallet.aiAgent(), aiAgent);
    }
    
    function testFail_SetAIAgent_NotOwner() public {
        vm.prank(user1);
        wallet.setAIAgent(aiAgent);
    }
    
    function testFail_SetAIAgent_ZeroAddress() public {
        vm.prank(owner);
        wallet.setAIAgent(address(0));
    }
    
    // Deposit tests
    function test_Deposit() public {
        uint256 depositAmount = 1 ether;
        
        vm.prank(user1);
        vm.expectEmit(true, false, false, true);
        emit Deposit(user1, depositAmount);
        wallet.deposit{value: depositAmount}();
        
        assertEq(wallet.getUserDeposit(user1), depositAmount);
        assertEq(wallet.getContractBalance(), depositAmount);
    }
    
    function testFail_Deposit_ZeroAmount() public {
        vm.prank(user1);
        wallet.deposit{value: 0}();
    }
    
    // Direct receive tests
    function test_ReceiveFunction() public {
        uint256 amount = 1 ether;
        
        vm.prank(user1);
        vm.expectEmit(true, false, false, true);
        emit Deposit(user1, amount);
        (bool success,) = address(wallet).call{value: amount}("");
        
        assertTrue(success);
        assertEq(wallet.getUserDeposit(user1), amount);
    }
    
    // AI Return funds tests
    function test_AIReturnFunds() public {
        uint256 depositAmount = 1 ether;
        
        // Setup: User deposits
        vm.prank(user1);
        wallet.deposit{value: depositAmount}();
        
        // Setup: Set AI agent
        vm.prank(owner);
        wallet.setAIAgent(aiAgent);
        
        // AI returns funds
        uint256 user1BalanceBefore = user1.balance;
        
        vm.prank(aiAgent);
        vm.expectEmit(true, false, false, true);
        emit Withdrawal(user1, depositAmount);
        wallet.aiReturnFunds(user1, depositAmount);
        
        assertEq(wallet.getUserDeposit(user1), 0);
        assertEq(user1.balance, user1BalanceBefore + depositAmount);
    }
    
    function testFail_AIReturnFunds_NotAIAgent() public {
        vm.prank(user2);
        wallet.aiReturnFunds(user1, 1 ether);
    }
    
    function testFail_AIReturnFunds_ExceedsDeposit() public {
        // Setup
        vm.prank(owner);
        wallet.setAIAgent(aiAgent);
        
        vm.prank(user1);
        wallet.deposit{value: 1 ether}();
        
        vm.prank(aiAgent);
        wallet.aiReturnFunds(user1, 2 ether);
    }
    
    // Owner withdrawal tests
    function test_OwnerWithdraw() public {
        // Setup: User deposits
        vm.prank(user1);
        wallet.deposit{value: 5 ether}();
        
        uint256 ownerBalanceBefore = owner.balance;
        uint256 withdrawAmount = 2 ether;
        
        vm.prank(owner);
        vm.expectEmit(true, false, false, true);
        emit Withdrawal(owner, withdrawAmount);
        wallet.ownerWithdraw(withdrawAmount);
        
        assertEq(owner.balance, ownerBalanceBefore + withdrawAmount);
        assertEq(wallet.getContractBalance(), 3 ether);
    }
    
    function testFail_OwnerWithdraw_NotOwner() public {
        vm.prank(user1);
        wallet.ownerWithdraw(1 ether);
    }
    
    function testFail_OwnerWithdraw_InsufficientBalance() public {
        vm.prank(owner);
        wallet.ownerWithdraw(1 ether);
    }
    
    // Multiple users scenario test
    function test_MultipleUsersScenario() public {
        // Users deposit different amounts
        vm.prank(user1);
        wallet.deposit{value: 2 ether}();
        
        vm.prank(user2);
        wallet.deposit{value: 3 ether}();
        
        assertEq(wallet.getContractBalance(), 5 ether);
        assertEq(wallet.getUserDeposit(user1), 2 ether);
        assertEq(wallet.getUserDeposit(user2), 3 ether);
        
        // Setup AI agent
        vm.prank(owner);
        wallet.setAIAgent(aiAgent);
        
        // AI returns partial funds to user1
        vm.prank(aiAgent);
        wallet.aiReturnFunds(user1, 1 ether);
        
        assertEq(wallet.getUserDeposit(user1), 1 ether);
        assertEq(wallet.getContractBalance(), 4 ether);
        
        // Owner withdraws some funds
        vm.prank(owner);
        wallet.ownerWithdraw(2 ether);
        
        assertEq(wallet.getContractBalance(), 2 ether);
    }
} 