import { User } from '../types/user';

// This is a mock authentication service for demonstration purposes
// In a real app, this would be replaced with actual API calls to a backend

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    createdAt: new Date().toISOString(),
  }
];

// Mock login function
export const mockLogin = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user && (password === 'password' || password === 'demo')) {
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

// Mock register function
export const mockRegister = async (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        reject(new Error('User already exists'));
        return;
      }
      
      const newUser: User = {
        id: `user-${MOCK_USERS.length + 1}`,
        name,
        email,
        createdAt: new Date().toISOString(),
      };
      
      MOCK_USERS.push(newUser);
      resolve(newUser);
    }, 800);
  });
};

// Mock logout function
export const mockLogout = async (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

export default { mockLogin, mockRegister, mockLogout };