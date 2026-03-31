<<<<<<< HEAD
# KingSports - Premium Sports E-Commerce

A modern, full-stack React e-commerce application for selling sports clothing and equipment with a complete admin panel.

![KingSports](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### Customer Features
- 🛍️ Full e-commerce functionality
- 🛒 Shopping cart with localStorage persistence
- 🔍 Product search and filtering by category
- 📱 Fully responsive design (mobile + desktop)
- 🎨 Modern UI with dark/light theme toggle
- ⭐ Product ratings and reviews
- 🔐 User authentication (login/register)
- 💳 Checkout process
- 📧 Newsletter subscription

### Admin Features
- 📊 Admin dashboard with analytics
- 📦 Product management (CRUD operations)
- 🖼️ Image upload system
- 👥 Customer management
- 📋 Order management
- 📈 Sales analytics

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- React Router DOM
- Context API for state management
- Tailwind CSS
- Vite

### Backend
- Node.js with Express
- JWT Authentication
- Multer for file uploads
- CORS enabled
- Rate limiting

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/kingsports.git
cd kingsports
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Setup Environment Variables

Create `.env` in root directory:
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Create `server/.env`:
```env
PORT=5001
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login
- **Backend API:** http://localhost:5001/api

## 📁 Project Structure

```
kingsports/
├── src/
│   ├── components/          # React components
│   │   ├── admin/          # Admin panel components
│   │   └── ui/             # UI components
│   ├── context/            # React Context providers
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin pages
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── Product.tsx
│   │   └── Cart.tsx
│   ├── services/           # API services
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types
│   └── data/               # Static data
├── server/
│   ├── routes/             # Express routes
│   ├── data/               # Database/data files
│   ├── uploads/            # Uploaded images
│   └── server.js           # Express server
├── public/                 # Static assets
└── package.json
```

## 🎯 Key Features Breakdown

### Shopping Cart
- Add/remove products
- Update quantities
- Auto-calculate totals
- Persist in localStorage

### Product Management
- 30+ products with real images
- Multiple categories (Footwear, Tops, Bottoms, Accessories, Outerwear, Electronics)
- Star ratings
- Detailed product pages
- Stock management

### Admin Panel
- Secure login
- Dashboard with statistics
- Product CRUD operations
- Image upload with drag & drop
- Order tracking
- Customer management

### UI/UX
- Smooth animations and transitions
- Hover effects
- Mobile-responsive navigation
- Dark/Light theme toggle
- Professional e-commerce design
- Neon green accent color (#00ff88)

## 🔐 Admin Access

Default admin credentials (change in production):
- Email: admin@kingsports.com
- Password: admin123

## 📸 Image Upload

The admin panel includes a built-in image upload system:
- Drag & drop support
- File validation (JPG, PNG, GIF)
- 5MB size limit
- Automatic preview
- Images stored in `server/uploads/`

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/admin/login` - Admin login

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (admin)

### Upload
- `POST /api/upload` - Upload image (admin)

## 🚀 Build for Production

```bash
npm run build
```

The build files will be in the `dist/` directory.

## 📝 Environment Variables

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL

### Backend (server/.env)
- `PORT` - Server port
- `FRONTEND_URL` - Frontend URL for CORS
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Heroicons
- Inspired by modern e-commerce platforms

---

**Made with ❤️ for sports enthusiasts**
=======
# sm
>>>>>>> 95ebd85a7dab908bb9aee87047273f57b9a2c0ea
