// frontend/src/components/organisms/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import Button from '../atoms/Button';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Space Tech
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            {t('home')}
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            {t('products')}
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300">
                {t('login')}
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                {t('register')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:text-gray-300">
                {t('profile')}
              </Link>
              <Button onClick={handleLogout} variant="danger" size="sm">
                Logout
              </Button>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
          <div className="flex space-x-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('ar')}
              className={`px-2 py-1 rounded ${i18n.language === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
            >
              عربي
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;