import React, { useState } from 'react';
import StockList from '../components/stock/StockList';
import StockDetail from '../components/stock/StockDetail';
import AlertForm from '../components/alerts/AlertForm';
import { useWatchlists } from '../context/WatchlistContext';
import { Stock } from '../types/stock';
import { useStocks } from '../hooks/useStocks';

const Dashboard: React.FC = () => {
  const { activeWatchlistId, watchlists } = useWatchlists();
  const { stocks, isLoading } = useStocks(activeWatchlistId);
  
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showAlertForm, setShowAlertForm] = useState(false);
  
  const activeWatchlist = watchlists.find(w => w.id === activeWatchlistId);
  
  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
  };
  
  const handleSetAlert = (stock: Stock) => {
    setSelectedStock(stock);
    setShowAlertForm(true);
  };
  
  const handleSaveAlert = (alert: any) => {
    console.log('Alert saved:', alert);
    // In a real app, this would save to the database
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {activeWatchlist ? activeWatchlist.name : 'My Watchlist'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {stocks.length} stocks • Last updated {new Date().toLocaleTimeString()}
        </p>
      </div>
      
      <StockList 
        stocks={stocks}
        onStockSelect={handleStockSelect}
      />
      
      {selectedStock && (
        <StockDetail 
          stock={selectedStock} 
          onClose={() => setSelectedStock(null)} 
        />
      )}
      
      {showAlertForm && selectedStock && (
        <AlertForm 
          stock={selectedStock}
          onClose={() => setShowAlertForm(false)}
          onSave={handleSaveAlert}
        />
      )}
    </div>
  );
};

export default Dashboard;