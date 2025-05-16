import { useState, useEffect } from 'react';
import { mockFetchStocks } from '../services/mockStocks';
import { Stock } from '../types/stock';

export const useStocks = (watchlistId: string) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      if (!watchlistId) {
        setStocks([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await mockFetchStocks(watchlistId);
        setStocks(data);
      } catch (err) {
        setError('Failed to fetch stocks');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
    
    // Set up a mock interval to simulate real-time updates
    const interval = setInterval(() => {
      setStocks(currentStocks => 
        currentStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 2;
          const newPrice = Math.max(stock.price + randomChange, 0.01);
          const change = newPrice - (stock.price - stock.change);
          const changePercent = (change / (stock.price - stock.change)) * 100;
          
          return {
            ...stock,
            price: newPrice,
            change,
            changePercent
          };
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [watchlistId]);

  return { stocks, isLoading, error };
};

export default useStocks;