import React, { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  spent: number;
  joined: string;
  status: string;
}

const Customers: React.FC = () => {
  const [customers] = useState<Customer[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, spent: 1299.99, joined: '2023-06-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 8, spent: 899.50, joined: '2023-07-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 15, spent: 1999.99, joined: '2023-05-10', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', orders: 6, spent: 749.99, joined: '2023-08-05', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', orders: 3, spent: 379.99, joined: '2023-09-12', status: 'Inactive' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', orders: 20, spent: 2599.99, joined: '2023-04-18', status: 'Active' },
    { id: 7, name: 'Chris Wilson', email: 'chris@example.com', orders: 10, spent: 1199.99, joined: '2023-07-25', status: 'Active' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', orders: 5, spent: 589.99, joined: '2023-08-30', status: 'Active' },
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage your customer base</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Active Customers</p>
          <p className="text-2xl font-bold text-gray-900">{customers.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Avg Orders</p>
          <p className="text-2xl font-bold text-gray-900">
            {(customers.reduce((acc, c) => acc + c.orders, 0) / customers.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Avg Spent</p>
          <p className="text-2xl font-bold text-gray-900">
            ${(customers.reduce((acc, c) => acc + c.spent, 0) / customers.length).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search customers..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${customer.spent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {customers.length} customers
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

export default Customers;
