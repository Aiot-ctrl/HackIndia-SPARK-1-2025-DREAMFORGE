import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import WalletPage from './pages/WalletPage';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wallet" element={<WalletPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;