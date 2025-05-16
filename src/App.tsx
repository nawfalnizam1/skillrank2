import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import StockPage from './pages/StockPage';
import AppLayout from './components/layout/AppLayout';
import { useAuth } from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import AuthProvider from './context/AuthContext';
import WatchlistProvider from './context/WatchlistContext';

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <Dashboard />
        </AppLayout>
      } />
      <Route path="/stock/:symbol" element={
        <AppLayout>
          <StockPage />
        </AppLayout>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WatchlistProvider>
          <Router>
            <AppRoutes />
          </Router>
        </WatchlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;