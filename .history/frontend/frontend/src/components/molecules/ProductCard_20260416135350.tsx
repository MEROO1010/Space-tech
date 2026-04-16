// frontend/src/components/molecules/ProductCard.tsx
import React from 'react';
import { Product } from '../../types/product';
import Button from '../atoms/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">{product.price} SAR</span>
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
          >
            {t('addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;