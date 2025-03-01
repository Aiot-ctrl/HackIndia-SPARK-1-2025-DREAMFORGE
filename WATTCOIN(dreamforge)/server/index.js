import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Web3 } from 'web3';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for API responses
const mockEnergyListings = [
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
];

const mockUserData = {
  balance: 205,
  transactions: [
    {
      id: 1,
      type: 'Purchase',
      source: 'Solar',
      amount: 50,
      price: 0.05,
      total: 2.5,
      date: '2025-04-10',
      status: 'Completed',
    },
    {
      id: 2,
      type: 'Purchase',
      source: 'Wind',
      amount: 100,
      price: 0.045,
      total: 4.5,
      date: '2025-04-08',
      status: 'Completed',
    },
  ],
  consumption: [
    { date: '2025-04-10', amount: 12 },
    { date: '2025-04-09', amount: 15 },
    { date: '2025-04-08', amount: 10 },
    { date: '2025-04-07', amount: 8 },
    { date: '2025-04-06', amount: 14 },
    { date: '2025-04-05', amount: 9 },
    { date: '2025-04-04', amount: 11 },
  ],
};

// API Routes
app.get('/api/listings', (req, res) => {
  res.json(mockEnergyListings);
});

app.get('/api/user/:address', (req, res) => {
  // In a real app, you would fetch user data based on the address
  res.json(mockUserData);
});

app.post('/api/purchase', (req, res) => {
  const { listingId, amount, address } = req.body;
  
  if (!listingId || !amount || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // In a real app, you would interact with a smart contract here
  
  res.json({
    success: true,
    message: 'Purchase successful',
    transaction: {
      id: Date.now(),
      listingId,
      amount,
      address,
      timestamp: new Date().toISOString(),
    },
  });
});

// Web3 connection (for demonstration purposes)
let web3;
try {
  // Connect to an Ethereum node (this is just for demonstration)
  // In production, you would use a real node URL
  web3 = new Web3('http://localhost:8545');
  console.log('Connected to Ethereum node');
} catch (error) {
  console.error('Error connecting to Ethereum node:', error.message);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;