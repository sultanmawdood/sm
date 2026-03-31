# KingSports Backend

Node.js/Express backend API for the KingSports e-commerce application.

## Features

- RESTful API endpoints
- Authentication (JWT)
- Product management
- Order processing
- CORS enabled
- Rate limiting
- Environment configuration

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status

### Dashboard
- `GET /api/dashboard` - Get dashboard stats

### Health
- `GET /api/health` - Health check

## Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```