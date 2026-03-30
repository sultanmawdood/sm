import { Product } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

// Map FakeStore API response to our Product type
const mapApiProduct = (apiProduct: any): Product => {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    category: apiProduct.category === 'men\'s clothing' || apiProduct.category === 'women\'s clothing' 
      ? 'Tops' 
      : apiProduct.category === 'electronics' 
      ? 'Accessories' 
      : 'Footwear',
    price: apiProduct.price,
    image: apiProduct.image,
    rating: apiProduct.rating?.rate || 4.5,
    description: apiProduct.description,
  };
};

export const productService = {
  // Fetch all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.map(mapApiProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Fetch single product
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return mapApiProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Fetch products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      const data = await response.json();
      return data.map(mapApiProduct);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};
