import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { backendService } from '../../services/backend';
import { DashboardStats, Order } from '../../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 45231.89,
    totalOrders: 234,
    totalCustomers: 1893,
    conversionRate: 3.24,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([
    { id: '#ORD-001', customer: 'John Doe', email: 'john@example.com', total: 129.99, status: 'Completed', date: '2024-01-20', items: 2 },
    { id: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', total: 89.50, status: 'Processing', date: '2024-01-20', items: 1 },
    { id: '#ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', total: 199.99, status: 'Shipped', date: '2024-01-19', items: 3 },
    { id: '#ORD-004', customer: 'Sarah Williams', email: 'sarah@example.com', total: 149.99, status: 'Completed', date: '2024-01-19', items: 2 },
    { id: '#ORD-005', customer: 'Tom Brown', email: 'tom@example.com', total: 79.99, status: 'Processing', date: '2024-01-18', items: 1 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!backendService.isConfigured()) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await backendService.getDashboard();
        setStats(data.stats);
        setRecentOrders(
          data.recentOrders.map((o) => ({
            ...o,
            email: o.email || '',
            items: o.items || 1,
          }))
        );
      } catch (err: any) {
        setError(err?.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const topProducts = [
    { name: 'Air Max Pro', sales: 145, revenue: 14500 },
    { name: 'Running Elite', sales: 132, revenue: 13200 },
    { name: 'Training Shorts', sales: 98, revenue: 4900 },
    { name: 'Sports Jacket', sales: 87, revenue: 8700 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {isLoading ? 'Loading latest data from backend...' : "Welcome back! Here's what's happening with your store."}
          </p>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-secondary rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">+12.5% from last month</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">+8.2% from last month</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Total Customers</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCustomers}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">+15.3% from last month</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Conversion Rate</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.conversionRate}%</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">+2.1% from last month</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-secondary rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                <Link to="/admin/orders" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">View all</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Top Products</h2>
                <Link to="/admin/products" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">View all</Link>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">${product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Link to="/admin/products/new" className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">Add Product</span>
            </Link>
            <Link to="/admin/orders" className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">View Orders</span>
            </Link>
            <Link to="/admin/customers" className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">Customers</span>
            </Link>
            <Link to="/admin/analytics" className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
