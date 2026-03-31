import { Product } from '../types';
import { products, categories } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useBackend = () => typeof API_BASE_URL === 'string' && API_BASE_URL.length > 0;

// Map backend response to Product; keeps compatibility if backend matches FakeStore shape
const mapApiProduct = (apiProduct: any): Product => ({
  id: apiProduct.id,
  name: apiProduct.title || apiProduct.name,
  category: apiProduct.category,
  price: apiProduct.price,
  image: apiProduct.image,
  rating: apiProduct.rating?.rate ?? apiProduct.rating ?? 4.5,
  description: apiProduct.description,
});

export const productService = {
  // Fetch all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      if (useBackend()) {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data.map(mapApiProduct);
      }
      // Static fallback (CORS-safe) for Vercel/static deployments
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      // On failure, fallback to static data so UI stays functional
      return products;
    }
  },

  // Fetch single product
  getProductById: async (id: number): Promise<Product> => {
    try {
      if (useBackend()) {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        return mapApiProduct(data);
      }
      const localProduct = products.find((p) => p.id === id);
      if (!localProduct) {
        throw new Error('Product not found');
      }
      return localProduct;
    } catch (error) {
      console.error('Error fetching product:', error);
      const fallback = products.find((p) => p.id === id);
      if (fallback) return fallback;
      throw error;
    }
  },

  // Fetch products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      if (useBackend()) {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products by category');
        }
        const data = await response.json();
        return data.map(mapApiProduct);
      }
      return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      if (useBackend()) {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return await response.json();
      }
      return categories.map((c) => c.name);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return categories.map((c) => c.name);
    }
  },
};
