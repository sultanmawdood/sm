import { Product } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
  }
  return response.json();
};

export const adminProductService = {
  // Create new product
  createProduct: async (productData: Omit<Product, 'id' | 'rating' | 'stock'>): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await handleResponse(response);
      return data.product;
    } catch (error) {
      console.error('Create product error:', error);
      throw new Error('Failed to create product. Please check your connection.');
    }
  },

  // Update existing product
  updateProduct: async (id: number, productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await handleResponse(response);
      return data.product;
    } catch (error) {
      console.error('Update product error:', error);
      throw new Error('Failed to update product. Please check your connection.');
    }
  },

  // Delete product
  deleteProduct: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });

      await handleResponse(response);
    } catch (error) {
      console.error('Delete product error:', error);
      throw new Error('Failed to delete product. Please check your connection.');
    }
  },
};