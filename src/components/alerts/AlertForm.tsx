import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Stock } from '../../types/stock';

interface AlertFormProps {
  stock: Stock;
  onClose: () => void;
  onSave: (alert: {
    stockId: string;
    condition: 'above' | 'below';
    price: number;
    notify: boolean;
  }) => void;
}

const AlertForm: React.FC<AlertFormProps> = ({ stock, onClose, onSave }) => {
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [price, setPrice] = useState(stock.price.toString());
  const [notify, setNotify] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      stockId: stock.id,
      condition,
      price: parseFloat(price),
      notify,
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Set Price Alert</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Current: ${stock.price.toFixed(2)}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alert me when price is
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setCondition('above')}
                className={`py-2 px-4 rounded-lg border ${
                  condition === 'above'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Above
              </button>
              <button
                type="button"
                onClick={() => setCondition('below')}
                className={`py-2 px-4 rounded-lg border ${
                  condition === 'below'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Below
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="notify"
                type="checkbox"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notify" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Send me a notification
              </label>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Save Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertForm;