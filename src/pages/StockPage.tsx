import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Calendar, DollarSign, Activity, LineChart, BarChart, History } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Stock, TimeRange } from '../types/stock';
import { useStock } from '../hooks/useStock';

const StockPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { stock, isLoading } = useStock(symbol || '');
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');
  
  const timeRanges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', '5Y'];
  
  if (isLoading || !stock) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const isPositive = stock.change >= 0;
  
  const keyMetrics = [
    { name: 'Market Cap', value: `$${(stock.price * stock.volume * 0.001).toFixed(2)}B` },
    { name: 'P/E Ratio', value: (Math.random() * 30 + 5).toFixed(2) },
    { name: 'Dividend Yield', value: `${(Math.random() * 3).toFixed(2)}%` },
    { name: 'Volume', value: stock.volume.toLocaleString() },
  ];
  
  const priceMetrics = [
    { name: 'Open', value: `$${(stock.price - stock.change * Math.random()).toFixed(2)}` },
    { name: 'Day Range', value: `$${(stock.price - stock.price * 0.01).toFixed(2)} - $${(stock.price + stock.price * 0.01).toFixed(2)}` },
    { name: '52W Range', value: `$${(stock.price * 0.7).toFixed(2)} - $${(stock.price * 1.3).toFixed(2)}` },
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{stock.symbol}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{stock.name}</p>
          </div>
          
          <div className="flex flex-col sm:items-end">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">${stock.price.toFixed(2)}</div>
            <div className="flex items-center">
              <span className={`flex items-center gap-1 ${
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {isPositive ? '+' : '-'}${Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Today</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</div>
              <div className="font-bold text-gray-900 dark:text-white text-lg">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
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
          
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-sm rounded flex items-center gap-1 ${
                chartType === 'line' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <LineChart className="h-4 w-4" />
              Line
            </button>
            <button
              onClick={() => setChartType('candle')}
              className={`px-3 py-1 text-sm rounded flex items-center gap-1 ${
                chartType === 'candle' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <BarChart className="h-4 w-4" />
              Candle
            </button>
          </div>
        </div>
        
        {/* Chart placeholder */}
        <div className="h-96 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">
            {chartType === 'line' ? 'Line' : 'Candlestick'} chart for {stock.symbol} - {timeRange}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About {stock.name}</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {stock.name} is a leading company in the {stock.sector} sector. The company specializes in 
              developing innovative solutions and has a strong market presence. With a focus on sustainable 
              growth and technological advancement, {stock.name} continues to expand its operations globally.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Founded in {1980 + Math.floor(Math.random() * 30)}, the company has established itself as a 
              major player in the industry. Its commitment to quality and customer satisfaction has earned 
              it a loyal customer base and industry recognition.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Founded</div>
                  <div className="font-medium text-gray-900 dark:text-white">{1980 + Math.floor(Math.random() * 30)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
                  <div className="font-medium text-gray-900 dark:text-white">${(Math.random() * 50 + 10).toFixed(2)}B</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Employees</div>
                  <div className="font-medium text-gray-900 dark:text-white">{Math.floor(Math.random() * 90000 + 10000).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <History className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">IPO Date</div>
                  <div className="font-medium text-gray-900 dark:text-white">{1990 + Math.floor(Math.random() * 20)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Statistics</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {priceMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{metric.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{metric.value}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              {[
                { name: 'EPS (TTM)', value: `$${(Math.random() * 10).toFixed(2)}` },
                { name: 'Beta', value: (Math.random() * 2 + 0.5).toFixed(2) },
                { name: 'Shares Outstanding', value: `${(Math.random() * 10 + 1).toFixed(2)}B` },
              ].map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{metric.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;