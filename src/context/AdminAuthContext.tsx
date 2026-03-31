import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (adminAuth === 'true' && loginTime) {
      // Check if session is still valid (24 hours)
      const now = Date.now();
      const loginTimestamp = parseInt(loginTime);
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
      
      if (now - loginTimestamp < sessionDuration) {
        setIsAdminAuthenticated(true);
      } else {
        // Session expired
        logout();
      }
    }
  }, []);

  const login = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('adminAuthenticated', 'true');
    localStorage.setItem('adminLoginTime', Date.now().toString());
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};