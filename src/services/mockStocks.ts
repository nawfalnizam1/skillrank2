import { Stock } from '../types/stock';

// Mock stock data
const MOCK_STOCKS: Stock[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 184.32,
    change: 2.56,
    changePercent: 1.41,
    volume: 78423456,
    sector: 'Technology',
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 413.64,
    change: 5.89,
    changePercent: 1.44,
    volume: 32156789,
    sector: 'Technology',
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 174.45,
    change: -1.24,
    changePercent: -0.71,
    volume: 15678912,
    sector: 'Technology',
  },
  {
    id: '4',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 186.21,
    change: 1.34,
    changePercent: 0.73,
    volume: 28456123,
    sector: 'Consumer Cyclical',
  },
  {
    id: '5',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 128.95,
    change: 3.56,
    changePercent: 2.84,
    volume: 42156789,
    sector: 'Technology',
  },
  {
    id: '6',
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 511.12,
    change: -2.78,
    changePercent: -0.54,
    volume: 18765432,
    sector: 'Communication Services',
  },
  {
    id: '7',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 242.76,
    change: -5.43,
    changePercent: -2.19,
    volume: 51234567,
    sector: 'Consumer Cyclical',
  },
  {
    id: '8',
    symbol: 'BRK.B',
    name: 'Berkshire Hathaway Inc.',
    price: 432.18,
    change: 1.23,
    changePercent: 0.29,
    volume: 9876543,
    sector: 'Financial Services',
  },
  {
    id: '9',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 187.15,
    change: 2.31,
    changePercent: 1.25,
    volume: 12345678,
    sector: 'Financial Services',
  },
  {
    id: '10',
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    price: 155.78,
    change: -0.87,
    changePercent: -0.56,
    volume: 8765432,
    sector: 'Healthcare',
  },
];

// Mock function to fetch all stocks for a watchlist
export const mockFetchStocks = async (watchlistId: string): Promise<Stock[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, return different stocks based on watchlist ID
      if (watchlistId === 'tech') {
        resolve(MOCK_STOCKS.filter(stock => stock.sector === 'Technology'));
      } else if (watchlistId === 'finance') {
        resolve(MOCK_STOCKS.filter(stock => stock.sector === 'Financial Services'));
      } else {
        resolve(MOCK_STOCKS);
      }
    }, 800);
  });
};

// Mock function to fetch a single stock by symbol
export const mockFetchStock = async (symbol: string): Promise<Stock> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
      
      if (stock) {
        resolve(stock);
      } else {
        reject(new Error(`Stock with symbol ${symbol} not found`));
      }
    }, 800);
  });
};

export default { mockFetchStocks, mockFetchStock };