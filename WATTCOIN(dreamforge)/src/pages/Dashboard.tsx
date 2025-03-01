import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Battery, Clock, DollarSign, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

// Mock data for energy consumption
const consumptionData = [
  { name: 'Mon', consumption: 12 },
  { name: 'Tue', consumption: 19 },
  { name: 'Wed', consumption: 15 },
  { name: 'Thu', consumption: 21 },
  { name: 'Fri', consumption: 16 },
  { name: 'Sat', consumption: 10 },
  { name: 'Sun', consumption: 8 },
];

// Mock data for energy sources
const sourceData = [
  { name: 'Solar', value: 45 },
  { name: 'Wind', value: 30 },
  { name: 'Hydro', value: 15 },
  { name: 'Biomass', value: 10 },
];

const COLORS = ['#FFBB28', '#00C49F', '#0088FE', '#8884D8'];

// Mock transaction data
const transactionData = [
  { id: 1, type: 'Purchase', source: 'Solar', amount: 50, price: 0.05, total: 2.5, date: '2025-04-10', status: 'Completed' },
  { id: 2, type: 'Purchase', source: 'Wind', amount: 100, price: 0.045, total: 4.5, date: '2025-04-08', status: 'Completed' },
  { id: 3, type: 'Sale', source: 'Solar', amount: 20, price: 0.052, total: 1.04, date: '2025-04-05', status: 'Completed' },
  { id: 4, type: 'Purchase', source: 'Hydro', amount: 75, price: 0.04, total: 3.0, date: '2025-04-01', status: 'Completed' },
];

const Dashboard: React.FC = () => {
  const { isConnected, connectWallet, account } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Connection Required</h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to access your energy dashboard and view your consumption analytics.
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Energy Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor your energy consumption, balance, and transactions
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-50 p-3 rounded-md flex items-center">
          <Battery className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="font-semibold text-blue-600">205 kWh</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('consumption')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'consumption'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Consumption
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transactions
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Total Energy</p>
                      <p className="text-xl font-semibold">205 kWh</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Daily Usage</p>
                      <p className="text-xl font-semibold">14.3 kWh</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Savings</p>
                      <p className="text-xl font-semibold">$42.50</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Est. Remaining</p>
                      <p className="text-xl font-semibold">14.3 days</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Weekly Consumption
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={consumptionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="consumption" name="kWh Used" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Energy Sources
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consumption' && (
            <div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-semibold">Energy Efficiency Score</h3>
                      <p className="text-sm text-gray-600">Based on your consumption patterns</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">87/100</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h3 className="text-lg font-semibold mb-4">Daily Consumption Breakdown</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consumptionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consumption" name="kWh Used" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Usage Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-green-100 p-1 rounded-full mr-2 mt-1"></span>
                      <p className="text-gray-700">Reduce consumption during peak hours (2PM - 6PM) to save on costs.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-100 p-1 rounded-full mr-2 mt-1"></span>
                      <p className="text-gray-700">Your highest usage day is Thursday. Consider adjusting your schedule.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-100 p-1 rounded-full mr-2 mt-1"></span>
                      <p className="text-gray-700">You could save 15% by shifting energy-intensive tasks to weekends.</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Projected Usage</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">This Week</span>
                        <span className="text-sm font-medium text-gray-700">101 kWh</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">This Month</span>
                        <span className="text-sm font-medium text-gray-700">320/500 kWh</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Yearly Average</span>
                        <span className="text-sm font-medium text-gray-700">1,240/2,000 kWh</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount (kWh)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price (ETH)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total (ETH)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactionData.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.type === 'Purchase' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.source}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {transactionData.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;