// frontend/src/pages/Home.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/organisms/Header';
import ProductCard from '../components/molecules/ProductCard';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t('welcome')}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;