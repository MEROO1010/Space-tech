// frontend/src/pages/Products.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeTemplate from '../components/templates/HomeTemplate';
import ProductCard from '../components/molecules/ProductCard';
import SearchBar from '../components/molecules/SearchBar';
import { useProducts } from '../hooks/useProducts';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { products, isLoading, setSearchQuery } = useProducts();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <HomeTemplate>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('products')}
      </h1>
      <div className="mb-6">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </HomeTemplate>
  );
};

export default Products;