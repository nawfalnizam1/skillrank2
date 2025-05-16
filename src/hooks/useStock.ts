import { useState, useEffect } from 'react';
import { mockFetchStock } from '../services/mockStocks';
import { Stock } from '../types/stock';

export const useStock = (symbol: string) => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      if (!symbol) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await mockFetchStock(symbol);
        setStock(data);
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStock();
    
    // Set up a mock interval to simulate real-time updates
    const interval = setInterval(() => {
      if (stock) {
        const randomChange = (Math.random() - 0.5) * 2;
        const newPrice = Math.max(stock.price + randomChange, 0.01);
        const change = newPrice - stock.price + stock.change;
        const changePercent = (change / stock.price) * 100;
        
        setStock({
          ...stock,
          price: newPrice,
          change,
          changePercent
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [symbol]);

  return { stock, isLoading, error };
};

export default useStock;