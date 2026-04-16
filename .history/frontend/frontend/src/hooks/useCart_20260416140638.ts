// frontend/src/hooks/useCart.ts
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { Product } from '../types';

export const useCart = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return { cart, handleAddToCart, handleRemoveFromCart };
};