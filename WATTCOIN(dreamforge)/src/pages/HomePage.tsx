import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BarChart2, Users, Shield, ArrowRight } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const HomePage: React.FC = () => {
  const { connectWallet, isConnected } = useWallet();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Revolutionizing Energy Trading with Blockchain
              </h1>
              <p className="text-xl mb-8">
                Buy, sell, and trade energy tokens securely and efficiently on our decentralized platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition flex items-center justify-center"
                  >
                    Connect to MetaMask <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <Link
                    to="/marketplace"
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition flex items-center justify-center"
                  >
                    Explore Marketplace <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition flex items-center justify-center"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Renewable Energy" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes energy trading simple, secure, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tokenized Electricity</h3>
              <p className="text-gray-600">
                Purchase energy tokens using cryptocurrency or fiat. Each token represents a specific amount of kWh.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">P2P Energy Trading</h3>
              <p className="text-gray-600">
                Energy producers list their available energy. Consumers browse and select the best offers.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BarChart2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Energy Analytics</h3>
              <p className="text-gray-600">
                Track real-time energy usage. Remaining energy balance is automatically updated.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Settlement & Rewards</h3>
              <p className="text-gray-600">
                Smart contracts handle payments instantly. Earn tokens which can be converted to fiat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technologies to ensure security, scalability, and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Blockchain</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2"></span>
                  Ethereum
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2"></span>
                  Binance Smart Chain
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2"></span>
                  Polygon
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">Frontend & Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2"></span>
                  React.js
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2"></span>
                  Node.js
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2"></span>
                  Express
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Integration</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="bg-purple-100 p-1 rounded-full mr-2"></span>
                  Smart Contracts (Solidity)
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-100 p-1 rounded-full mr-2"></span>
                  IPFS / Decentralized Storage
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-100 p-1 rounded-full mr-2"></span>
                  MetaMask, Trust Wallet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Energy Revolution?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start trading energy tokens today and be part of the sustainable future.
          </p>
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-white text-blue-600 px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-100 transition"
            >
              Connect Your Wallet
            </button>
          ) : (
            <Link
              to="/marketplace"
              className="bg-white text-blue-600 px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-100 transition"
            >
              Start Trading Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;