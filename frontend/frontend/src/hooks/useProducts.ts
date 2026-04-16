// frontend/src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/products';
import { useState } from 'react';

export const useProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: () => fetchProducts(searchQuery),
  });

  return { products: products || [], isLoading, setSearchQuery };
};