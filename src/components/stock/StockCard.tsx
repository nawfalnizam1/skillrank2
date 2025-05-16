import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Stock } from '../../types/stock';

interface StockCardProps {
  stock: Stock;
  onClick: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  const isPositive = stock.change >= 0;
  const changePercent = Math.abs(stock.changePercent).toFixed(2);
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{stock.symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[140px]">{stock.name}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
          isPositive 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
        }`}>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {changePercent}%
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-end">
        <div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">${stock.price.toFixed(2)}</span>
          <span className={`ml-2 text-sm ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? '+' : '-'}${Math.abs(stock.change).toFixed(2)}
          </span>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Vol: {stock.volume.toLocaleString()}
        </div>
      </div>
      
      {/* Mini Sparkline Chart - Placeholder */}
      <div className="h-8 mt-2 bg-gray-100 dark:bg-gray-700 rounded">
        {/* This would be replaced with an actual chart component */}
      </div>
    </div>
  );
};

export default StockCard;