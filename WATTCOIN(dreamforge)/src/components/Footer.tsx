import React from 'react';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 mr-2 text-blue-400" />
              <span className="font-bold text-xl">EnergyChain</span>
            </div>
            <p className="text-gray-300 text-sm">
              Revolutionizing energy trading with blockchain technology. Empowering users to buy, sell, and trade energy tokens securely and efficiently.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/marketplace" className="text-gray-300 hover:text-white transition">Marketplace</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</a></li>
              <li><a href="/wallet" className="text-gray-300 hover:text-white transition">Wallet</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">API Reference</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Smart Contracts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Subscribe to our newsletter for updates
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-gray-800 rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EnergyChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;