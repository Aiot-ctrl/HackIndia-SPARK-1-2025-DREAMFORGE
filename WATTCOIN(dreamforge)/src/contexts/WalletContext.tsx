import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  account: string | null;
  balance: string;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.providers.Web3Provider | null;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  balance: '0',
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  provider: null,
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);

      // Check if already connected
      checkConnection(web3Provider);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0], web3Provider);
        } else {
          setAccount(null);
          setBalance('0');
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const checkConnection = async (provider: ethers.providers.Web3Provider) => {
    try {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        updateBalance(accounts[0], provider);
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const updateBalance = async (address: string, provider: ethers.providers.Web3Provider) => {
    try {
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      if (provider) {
        updateBalance(accounts[0], provider);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        balance,
        isConnected: !!account,
        connectWallet,
        disconnectWallet,
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};