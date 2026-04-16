// frontend/src/components/templates/HomeTemplate.tsx
import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

interface HomeTemplateProps {
  children: React.ReactNode;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeTemplate;