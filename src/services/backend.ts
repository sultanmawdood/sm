import { Order, DashboardStats } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const isConfigured = () => typeof API_BASE_URL === 'string' && API_BASE_URL.length > 0;

const fetchJson = async <T>(path: string): Promise<T> => {
  if (!isConfigured()) {
    throw new Error('Backend API base URL not configured (set VITE_API_BASE_URL)');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return response.json();
};

export const backendService = {
  isConfigured,

  getOrders: () => fetchJson<Order[]>('/orders'),

  getDashboard: () => fetchJson<{ stats: DashboardStats; recentOrders: Order[] }>('/dashboard'),
};
