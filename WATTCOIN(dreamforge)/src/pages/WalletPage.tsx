import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, Copy, ExternalLink, RefreshCw, DollarSign, Send, Plus, AlertTriangle } from 'lucide-react';

const WalletPage: React.FC = () => {
  const { account, balance, isConnected, connectWallet } = useWallet();
  const [copySuccess, setCopySuccess] = useState('');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');

  // Mock token balance data
  const tokenBalance = {
    amount: 205,
    value: 10.25, // ETH value
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      },
      () => {
        setCopySuccess('Failed to copy');
      }
    );
  };

  const handleBuyTokens = () => {
    // Here you would integrate with your smart contract to purchase tokens
    alert(`Purchase of ${buyAmount} energy tokens initiated`);
    setShowBuyModal(false);
    setBuyAmount('');
  };

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Connection Required</h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to access your energy tokens and transaction history.
          </p>
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Wallet</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Wallet Details</h2>
                <Wallet className="h-6 w-6" />
              </div>
              <p className="text-sm opacity-80">Connected with MetaMask</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Account Address</p>
                <div className="flex items-center">
                  <p className="font-mono text-sm mr-2 truncate">
                    {account}
                  </p>
                  <button 
                    onClick={() => copyToClipboard(account || '')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copySuccess && (
                    <span className="ml-2 text-xs text-green-600">{copySuccess}</span>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">ETH Balance</p>
                <p className="text-2xl font-semibold">{balance} ETH</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Energy Tokens</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">{tokenBalance.amount} kWh</p>
                  <p className="ml-2 text-sm text-gray-500">≈ {tokenBalance.value} ETH</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <a 
                  href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Etherscan
                </a>
                <button 
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Token Management */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Energy Token Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="ml-3 font-semibold">Buy Energy Tokens</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Purchase energy tokens to use on the platform. Tokens can be used to buy energy from producers.
                </p>
                <button
                  onClick={() => setShowBuyModal(true)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Buy Tokens
                </button>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Send className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="ml-3 font-semibold">Transfer Tokens</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Transfer your energy tokens to another wallet or to a smart meter for consumption.
                </p>
                <button
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Transfer
                </button>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Token Purchase</p>
                    <p className="text-sm text-gray-500">100 kWh for 5 ETH</p>
                  </div>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Energy Consumption</p>
                    <p className="text-sm text-gray-500">15 kWh used</p>
                  </div>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Token Transfer</p>
                    <p className="text-sm text-gray-500">50 kWh to Smart Meter</p>
                  </div>
                  <p className="text-xs text-gray-500">5 days ago</p>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Token Purchase</p>
                    <p className="text-sm text-gray-500">200 kWh for 10 ETH</p>
                  </div>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
            
            <button className="mt-6 w-full border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              View All Activity
            </button>
          </div>
        </div>
      </div>
      
      {/* Buy Tokens Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Buy Energy Tokens</h3>
              <button 
                onClick={() => setShowBuyModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (kWh)
              </label>
              <input
                type="number"
                id="amount"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount to buy"
              />
            </div>
            
            {buyAmount && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per kWh:</span>
                  <span className="font-medium">0.05 ETH</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">{buyAmount} kWh</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-800 font-medium">Total Cost:</span>
                  <span className="text-blue-600 font-semibold">
                    {(parseFloat(buyAmount) * 0.05).toFixed(2)} ETH
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBuyModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyTokens}
                disabled={!buyAmount || parseFloat(buyAmount) <= 0}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium text-white ${
                  !buyAmount || parseFloat(buyAmount) <= 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;