// frontend/src/services/orders.ts
import API from './api';

interface Order {
  id: number;
  user: number;
  created_at: string;
  updated_at: string;
  total_price: number;
  is_paid: boolean;
  items: {
    product: number;
    quantity: number;
    price: number;
  }[];
}

export const createOrder = async (items: { product_id: number; quantity: number }[]): Promise<Order> => {
  const response = await API.post('/orders/', { items });
  return response.data;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await API.get('/orders/');
  return response.data;
};

export const fetchOrderDetails = async (id: number): Promise<Order> => {
  const response = await API.get(`/orders/${id}/`);
  return response.data;
};