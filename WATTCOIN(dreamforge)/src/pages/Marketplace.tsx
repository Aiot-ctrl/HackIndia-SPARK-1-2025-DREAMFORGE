import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Zap, Filter, ArrowUpDown, Info } from 'lucide-react';

// Mock data for energy listings
const mockListings = [
  {
    id: 1,
    producer: '0x8a43...5e31',
    source: 'Solar',
    location: 'California, USA',
    amount: 100,
    price: 0.05,
    total: 5,
    rating: 4.8,
  },
  {
    id: 2,
    producer: '0x7b21...9f47',
    source: 'Wind',
    location: 'Texas, USA',
    amount: 250,
    price: 0.045,
    total: 11.25,
    rating: 4.6,
  },
  {
    id: 3,
    producer: '0x3e67...2d18',
    source: 'Hydro',
    location: 'Washington, USA',
    amount: 500,
    price: 0.04,
    total: 20,
    rating: 4.9,
  },
  {
    id: 4,
    producer: '0x9c12...7a53',
    source: 'Solar',
    location: 'Arizona, USA',
    amount: 150,
    price: 0.048,
    total: 7.2,
    rating: 4.7,
  },
  {
    id: 5,
    producer: '0x2f89...4b26',
    source: 'Biomass',
    location: 'Oregon, USA',
    amount: 200,
    price: 0.042,
    total: 8.4,
    rating: 4.5,
  },
  {
    id: 6,
    producer: '0x6d34...1c78',
    source: 'Wind',
    location: 'Iowa, USA',
    amount: 300,
    price: 0.043,
    total: 12.9,
    rating: 4.8,
  },
];

const Marketplace: React.FC = () => {
  const { isConnected, connectWallet } = useWallet();
  const [listings, setListings] = useState(mockListings);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterSource, setFilterSource] = useState('all');
  const [purchaseAmount, setPurchaseAmount] = useState<{ [key: number]: number }>({});

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }

    const sortedListings = [...listings].sort((a, b) => {
      const aValue = a[criteria as keyof typeof a];
      const bValue = b[criteria as keyof typeof b];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    setListings(sortedListings);
  };

  const handleFilter = (source: string) => {
    setFilterSource(source);
    if (source === 'all') {
      setListings(mockListings);
    } else {
      const filteredListings = mockListings.filter(
        listing => listing.source.toLowerCase() === source.toLowerCase()
      );
      setListings(filteredListings);
    }
  };

  const handlePurchaseAmountChange = (id: number, amount: number) => {
    setPurchaseAmount({
      ...purchaseAmount,
      [id]: amount,
    });
  };

  const handlePurchase = (id: number) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    const amount = purchaseAmount[id] || 0;
    if (amount <= 0) {
      alert('Please enter a valid amount to purchase');
      return;
    }
    
    const listing = listings.find(item => item.id === id);
    if (!listing) return;
    
    if (amount > listing.amount) {
      alert(`Only ${listing.amount} kWh available for purchase`);
      return;
    }
    
    // Here you would integrate with your smart contract to execute the purchase
    alert(`Purchase initiated for ${amount} kWh of ${listing.source} energy for ${(amount * listing.price).toFixed(2)} ETH`);
    
    // Update the listing to reflect the purchase
    const updatedListings = listings.map(item => {
      if (item.id === id) {
        return {
          ...item,
          amount: item.amount - amount,
        };
      }
      return item;
    });
    
    setListings(updatedListings);
    setPurchaseAmount({
      ...purchaseAmount,
      [id]: 0,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Energy Marketplace</h1>
          <p className="text-gray-600 mt-2">
            Browse and purchase energy tokens from various producers
          </p>
        </div>
        
        {!isConnected && (
          <button
            onClick={connectWallet}
            className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition flex items-center"
          >
            Connect Wallet to Trade
          </button>
        )}
      </div>
      
      {/* Filters and Sorting */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" /> Filter by Source
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => handleFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterSource === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilter('solar')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterSource === 'solar'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Solar
              </button>
              <button
                onClick={() => handleFilter('wind')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterSource === 'wind'
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Wind
              </button>
              <button
                onClick={() => handleFilter('hydro')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterSource === 'hydro'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Hydro
              </button>
              <button
                onClick={() => handleFilter('biomass')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterSource === 'biomass'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Biomass
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <ArrowUpDown className="h-5 w-5 mr-2" /> Sort by
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => handleSort('price')}
                className={`px-3 py-1 rounded-full text-sm ${
                  sortBy === 'price'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('amount')}
                className={`px-3 py-1 rounded-full text-sm ${
                  sortBy === 'amount'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('rating')}
                className={`px-3 py-1 rounded-full text-sm ${
                  sortBy === 'rating'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Energy Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className={`p-4 text-white ${
              listing.source === 'Solar' ? 'bg-yellow-500' :
              listing.source === 'Wind' ? 'bg-teal-500' :
              listing.source === 'Hydro' ? 'bg-blue-500' :
              'bg-green-500'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{listing.source} Energy</h3>
                <Zap className="h-6 w-6" />
              </div>
              <p className="text-sm opacity-90">{listing.location}</p>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Producer</p>
                  <p className="font-medium">{listing.producer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-medium flex items-center">
                    {listing.rating} 
                    <span className="text-yellow-500 ml-1">★</span>
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="font-medium">{listing.amount} kWh</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price per kWh</p>
                  <p className="font-medium">{listing.price} ETH</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center mb-3">
                  <input
                    type="number"
                    min="1"
                    max={listing.amount}
                    value={purchaseAmount[listing.id] || ''}
                    onChange={(e) => handlePurchaseAmountChange(listing.id, parseInt(e.target.value) || 0)}
                    placeholder="Amount to buy"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">kWh</span>
                </div>
                
                {purchaseAmount[listing.id] > 0 && (
                  <div className="bg-gray-50 p-2 rounded-md mb-3 flex justify-between">
                    <span>Total cost:</span>
                    <span className="font-semibold">
                      {((purchaseAmount[listing.id] || 0) * listing.price).toFixed(4)} ETH
                    </span>
                  </div>
                )}
                
                <button
                  onClick={() => handlePurchase(listing.id)}
                  className={`w-full py-2 rounded-md font-medium ${
                    isConnected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  } transition`}
                >
                  {isConnected ? 'Purchase Energy' : 'Connect Wallet to Buy'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {listings.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Energy Listings Found</h3>
          <p className="text-gray-600">
            There are no energy listings matching your current filters. Try adjusting your filters or check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;