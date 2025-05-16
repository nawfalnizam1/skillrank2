import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockFetchWatchlists, mockCreateWatchlist, mockDeleteWatchlist } from '../services/mockWatchlist';
import { Watchlist } from '../types/watchlist';

interface WatchlistContextType {
  watchlists: Watchlist[];
  activeWatchlistId: string;
  isLoading: boolean;
  createWatchlist: (name: string) => Promise<Watchlist>;
  deleteWatchlist: (id: string) => Promise<void>;
  setActiveWatchlistId: (id: string) => void;
}

const WatchlistContext = createContext<WatchlistContextType>({
  watchlists: [],
  activeWatchlistId: '',
  isLoading: true,
  createWatchlist: async () => ({ id: '', name: '', stocks: 0 }),
  deleteWatchlist: async () => {},
  setActiveWatchlistId: () => {},
});

export const useWatchlists = () => useContext(WatchlistContext);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [activeWatchlistId, setActiveWatchlistId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWatchlists = async () => {
      setIsLoading(true);
      try {
        const data = await mockFetchWatchlists();
        setWatchlists(data);
        if (data.length > 0 && !activeWatchlistId) {
          setActiveWatchlistId(data[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlists();
  }, []);

  const createWatchlist = async (name: string) => {
    setIsLoading(true);
    try {
      const newWatchlist = await mockCreateWatchlist(name);
      setWatchlists(prev => [...prev, newWatchlist]);
      return newWatchlist;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWatchlist = async (id: string) => {
    setIsLoading(true);
    try {
      await mockDeleteWatchlist(id);
      setWatchlists(prev => prev.filter(watchlist => watchlist.id !== id));
      
      // If the active watchlist is deleted, select the first available one
      if (activeWatchlistId === id) {
        const remaining = watchlists.filter(w => w.id !== id);
        if (remaining.length > 0) {
          setActiveWatchlistId(remaining[0].id);
        } else {
          setActiveWatchlistId('');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WatchlistContext.Provider 
      value={{ 
        watchlists, 
        activeWatchlistId, 
        isLoading, 
        createWatchlist, 
        deleteWatchlist, 
        setActiveWatchlistId 
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;