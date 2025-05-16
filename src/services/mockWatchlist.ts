import { Watchlist } from '../types/watchlist';

// Mock watchlist data
const MOCK_WATCHLISTS: Watchlist[] = [
  {
    id: 'all',
    name: 'All Stocks',
    stocks: 10,
  },
  {
    id: 'tech',
    name: 'Technology',
    stocks: 4,
  },
  {
    id: 'finance',
    name: 'Financial',
    stocks: 2,
  },
];

// Mock function to fetch all watchlists
export const mockFetchWatchlists = async (): Promise<Watchlist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_WATCHLISTS);
    }, 800);
  });
};

// Mock function to create a new watchlist
export const mockCreateWatchlist = async (name: string): Promise<Watchlist> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newWatchlist: Watchlist = {
        id: `watchlist-${Date.now()}`,
        name,
        stocks: 0,
      };
      
      MOCK_WATCHLISTS.push(newWatchlist);
      resolve(newWatchlist);
    }, 800);
  });
};

// Mock function to delete a watchlist
export const mockDeleteWatchlist = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = MOCK_WATCHLISTS.findIndex(w => w.id === id);
      if (index !== -1) {
        MOCK_WATCHLISTS.splice(index, 1);
      }
      resolve();
    }, 800);
  });
};

export default { mockFetchWatchlists, mockCreateWatchlist, mockDeleteWatchlist };