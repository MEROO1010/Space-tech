// frontend/src/hooks/useProductDetails.ts
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails } from '../services/products';

export const useProductDetails = (id: number) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id),
  });

  return { product, isLoading };
};