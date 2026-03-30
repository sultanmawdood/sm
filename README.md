# KingSports - Premium Sports E-Commerce

A modern, production-ready React e-commerce application for selling sports clothing and equipment.

## Features

- 🛍️ Full e-commerce functionality
- 🛒 Shopping cart with localStorage persistence
- 🔍 Product search and filtering
- 📱 Fully responsive design (mobile + desktop)
- 🎨 Modern UI with black/white theme and neon accents
- ⭐ Product ratings
- 🔐 Authentication pages
- 🚀 Fast and optimized with Vite

## Tech Stack

- React 18
- React Router DOM
- Context API for state management
- Tailwind CSS
- Vite

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

or

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
kingsports/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   └── Button.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   └── Auth.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## Features Breakdown

### Cart Management
- Add products to cart
- Remove products from cart
- Update quantities
- Auto-calculate totals
- Persist cart in localStorage

### Product Features
- 12 products with real images
- Product categories
- Star ratings
- Detailed product pages
- Related products

### UI/UX
- Smooth animations and transitions
- Hover effects
- Mobile-responsive navigation
- Professional e-commerce design
- Neon green accent color (#00ff88)

## License

MIT
