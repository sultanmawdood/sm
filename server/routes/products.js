import express from 'express';
import { products } from '../data/products.js';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  const { category, search, sort } = req.query;
  let filteredProducts = [...products];

  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search
  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sort) {
    switch (sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  res.json(filteredProducts);
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Add new product
router.post('/', (req, res) => {
  try {
    const { name, category, price, image, description } = req.body;
    
    const newProduct = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name,
      category,
      price: parseFloat(price),
      image,
      rating: 4.5,
      stock: 50,
      description
    };
    
    products.push(newProduct);
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const { name, category, price, image, description } = req.body;
    
    products[productIndex] = {
      ...products[productIndex],
      name,
      category,
      price: parseFloat(price),
      image,
      description
    };
    
    res.json({ message: 'Product updated successfully', product: products[productIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default router;