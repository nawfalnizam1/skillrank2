import React, { useState } from 'react';
import { X, ChevronLeft, Plus, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Stock, TimeRange } from '../../types/stock';

interface StockDetailProps {
  stock: Stock;
  onClose: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onClose }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const isPositive = stock.change >= 0;
  
  const timeRanges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', '5Y'];
  
  const metrics = [
    { label: 'Open', value: `$${(stock.price - stock.change * Math.random()).toFixed(2)}` },
    { label: 'High', value: `$${(stock.price + stock.price * 0.01).toFixed(2)}` },
    { label: 'Low', value: `$${(stock.price - stock.price * 0.01).toFixed(2)}` },
    { label: 'Volume', value: stock.volume.toLocaleString() },
    { label: 'Market Cap', value: `$${(stock.price * stock.volume * 0.001).toFixed(2)}B` },
    { label: 'P/E Ratio', value: (Math.random() * 30 + 5).toFixed(2) },
    { label: '52W High', value: `$${(stock.price * 1.3).toFixed(2)}` },
    { label: '52W Low', value: `$${(stock.price * 0.7).toFixed(2)}` },
  ];
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Plus className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="h-5 w-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.symbol}</h2>
              <p className="text-gray-600 dark:text-gray-400">{stock.name}</p>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
              isPositive 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${stock.price.toFixed(2)}</span>
              <span className={`text-lg ${
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositive ? '+' : '-'}${Math.abs(stock.change).toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Last updated: Today at {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          {/* Chart timeframe selector */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-4 w-fit">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded ${
                  timeRange === range 
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          {/* Placeholder for chart */}
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Chart for {stock.symbol} - {timeRange}</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{metric.value}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">About {stock.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {stock.name} is a leading company in the {stock.sector} sector. The company specializes in 
              innovative solutions and has shown {isPositive ? 'positive' : 'negative'} performance in recent market activity.
              Investors should consider various factors including market conditions, company performance, and overall economic trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;