import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { backendService } from '../../services/backend';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: '#ORD-001', customer: 'John Doe', email: 'john@example.com', total: 129.99, status: 'Completed', date: '2024-01-20', items: 2 },
    { id: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', total: 89.50, status: 'Processing', date: '2024-01-20', items: 1 },
    { id: '#ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', total: 199.99, status: 'Shipped', date: '2024-01-19', items: 3 },
    { id: '#ORD-004', customer: 'Sarah Williams', email: 'sarah@example.com', total: 149.99, status: 'Completed', date: '2024-01-19', items: 2 },
    { id: '#ORD-005', customer: 'Tom Brown', email: 'tom@example.com', total: 79.99, status: 'Processing', date: '2024-01-18', items: 1 },
    { id: '#ORD-006', customer: 'Emily Davis', email: 'emily@example.com', total: 259.99, status: 'Shipped', date: '2024-01-18', items: 4 },
    { id: '#ORD-007', customer: 'Chris Wilson', email: 'chris@example.com', total: 119.99, status: 'Completed', date: '2024-01-17', items: 2 },
    { id: '#ORD-008', customer: 'Lisa Anderson', email: 'lisa@example.com', total: 189.99, status: 'Cancelled', date: '2024-01-17', items: 3 },
  ]);

  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!backendService.isConfigured()) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiOrders = await backendService.getOrders();
        setOrders(apiOrders);
      } catch (err: any) {
        setError(err?.message || 'Failed to load orders from backend');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {['All', 'Processing', 'Shipped', 'Completed', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search orders..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="px-6 py-4 text-sm text-red-700 bg-red-50 border-b border-red-100">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {isLoading
              ? 'Loading orders...'
              : `Showing ${filteredOrders.length} of ${orders.length} orders`}
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
