import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { products } from './data/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(limiter);
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'KingSports API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'KingSports Backend API', 
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      auth: '/api/auth',
      orders: '/api/orders',
      dashboard: '/api/dashboard'
    }
  });
});

// Dashboard stats
app.get('/api/dashboard', (req, res) => {
  const stats = {
    totalOrders: 156,
    totalRevenue: 45230.50,
    totalCustomers: 89,
    totalProducts: products.length
  };
  
  const recentOrders = [
    {
      id: '1',
      customerName: 'John Doe',
      email: 'john@example.com',
      total: 299.99,
      status: 'completed',
      date: new Date().toISOString(),
      items: [
        { productId: 1, quantity: 1, price: 139.99 },
        { productId: 3, quantity: 1, price: 65.99 }
      ]
    }
  ];

  res.json({ stats, recentOrders });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});