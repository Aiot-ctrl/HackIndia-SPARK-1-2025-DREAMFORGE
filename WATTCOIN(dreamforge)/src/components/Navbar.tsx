import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import {
  Zap,
  Menu,
  X,
  User,
  BarChart2,
  ShoppingBag,
  Wallet,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { account, balance, isConnected, connectWallet } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Zap className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">WATTChain</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Marketplace
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/wallet"
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Wallet
            </Link>

            {isConnected ? (
              <div className="flex items-center bg-blue-700 px-4 py-2 rounded-md">
                <Wallet className="h-4 w-4 mr-2" />
                <span className="text-sm">{`${account?.substring(
                  0,
                  6
                )}...${account?.substring(account.length - 4)}`}</span>
                <span className="ml-2 text-sm font-medium">{balance} ETH</span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <User className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link
              to="/marketplace"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Marketplace
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/wallet"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Wallet
            </Link>

            {!isConnected && (
              <button
                onClick={connectWallet}
                className="w-full mt-2 bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {isConnected && (
            <div className="px-5 py-3 border-t border-blue-700">
              <div className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                <span className="text-sm">{`${account?.substring(
                  0,
                  6
                )}...${account?.substring(account.length - 4)}`}</span>
                <span className="ml-2 text-sm font-medium">{balance} ETH</span>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
