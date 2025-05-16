import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed top-0 left-0 w-full p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-blue-600 dark:text-blue-400 font-bold text-xl flex items-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="mr-2"
            >
              <path 
                d="M3 3V19.5C3 20.0523 3.44772 20.5 4 20.5H21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <path 
                d="M7 14L11 10L15 14L20 9" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            StockWatch
          </div>
        </div>
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {isLogin 
              ? 'Sign in to access your watchlists and alerts'
              : 'Start tracking your favorite stocks with StockWatch'}
          </p>
        </div>
        
        {isLogin ? <LoginForm /> : <RegisterForm />}
        
        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2025 StockWatch. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthPage;