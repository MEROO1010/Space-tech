// frontend/src/utils/helpers.ts
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};