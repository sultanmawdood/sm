import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Products = lazy(() => import('./pages/admin/Products'));
const Customers = lazy(() => import('./pages/admin/Customers'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));

const AdminShell: React.FC = () => (
  <AdminProtectedRoute>
    <AdminLayout>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  </AdminProtectedRoute>
);

const StoreLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white dark:bg-primary">
    <Navbar />
    <main className="flex-grow">
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <LiveChat />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: <AdminShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'orders', element: <Orders /> },
      { path: 'products', element: <Products /> },
      { path: 'customers', element: <Customers /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
  {
    path: '/',
    element: <StoreLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:id', element: <Product /> },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: 'auth', element: <Auth /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider
              router={router}
              fallbackElement={<LoadingSpinner fullScreen />}
              future={{
                v7_startTransition: true,
              }}
            />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
