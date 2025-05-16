import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Trash2, Edit, MoreVertical } from 'lucide-react';
import { useWatchlists } from '../../context/WatchlistContext';

interface WatchlistItemProps {
  watchlist: {
    id: string;
    name: string;
    stocks: number;
  };
  isActive: boolean;
  onSelect: () => void;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({ watchlist, isActive, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-medium">{watchlist.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{watchlist.stocks} stocks</span>
        </div>
      </div>
      <div className="relative">
        <button 
          onClick={handleMenuToggle}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { watchlists, activeWatchlistId, setActiveWatchlistId } = useWatchlists();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <aside className="h-[calc(100vh-64px)] w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <button className="w-full flex items-center justify-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">New Watchlist</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400">MY WATCHLISTS</h2>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
        
        {!isCollapsed && (
          <div className="space-y-2">
            {watchlists.map((watchlist) => (
              <WatchlistItem 
                key={watchlist.id}
                watchlist={watchlist}
                isActive={watchlist.id === activeWatchlistId}
                onSelect={() => setActiveWatchlistId(watchlist.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Pro Tip</h3>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Create multiple watchlists to organize your investments by sector or strategy.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;