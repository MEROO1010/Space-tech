// frontend/src/components/organisms/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">{t('footerText')}</p>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Space Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;