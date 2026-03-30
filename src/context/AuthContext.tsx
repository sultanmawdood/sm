import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { showToast } from '../utils/toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('kingsports-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('kingsports-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('kingsports-users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        };
        setUser(userData);
        localStorage.setItem('kingsports-user', JSON.stringify(userData));
        showToast({ message: `Welcome back, ${userData.name}!`, type: 'success' });
        return true;
      } else {
        showToast({ message: 'Invalid email or password', type: 'error' });
        return false;
      }
    } catch (error) {
      showToast({ message: 'Login failed. Please try again.', type: 'error' });
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('kingsports-users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);

      if (existingUser) {
        showToast({ message: 'Email already registered', type: 'error' });
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
      };

      users.push(newUser);
      localStorage.setItem('kingsports-users', JSON.stringify(users));

      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      setUser(userData);
      localStorage.setItem('kingsports-user', JSON.stringify(userData));
      showToast({ message: `Welcome to KingSports, ${name}!`, type: 'success' });
      return true;
    } catch (error) {
      showToast({ message: 'Signup failed. Please try again.', type: 'error' });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kingsports-user');
    showToast({ message: 'Logged out successfully', type: 'info' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
