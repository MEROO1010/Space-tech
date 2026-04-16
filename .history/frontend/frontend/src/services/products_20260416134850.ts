// frontend/src/services/products.ts
import API from './api';
import { Product } from '../types/product';

export const fetchProducts = async (searchQuery: string): Promise<Product[]> => {
  const response = await API.get('/products/', { params: { search: searchQuery } });
  return response.data;
};

export const fetchProductDetails = async (id: number): Promise<Product> => {
  const response = await API.get(`/products/${id}/`);
  return response.data;
};