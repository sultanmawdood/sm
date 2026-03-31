import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-primary">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-white dark:bg-secondary shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-primary border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
