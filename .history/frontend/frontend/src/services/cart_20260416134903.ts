// frontend/src/services/cart.ts
import API from './api';

export const addToCart = async (productId: number): Promise<void> => {
  await API.post('/cart/', { product_id: productId });
};

export const removeFromCart = async (productId: number): Promise<void> => {
  await API.delete(`/cart/${productId}/`);
};

export const clearCart = async (): Promise<void> => {
  await API.delete('/cart/clear/');
};