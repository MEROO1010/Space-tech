// frontend/src/pages/Profile.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeTemplate from '../components/templates/HomeTemplate';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <HomeTemplate>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('profile')}
      </h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">{user?.name}</h2>
        <p className="text-gray-600 mb-2">{user?.email}</p>
        <p className="text-gray-600">{t('memberSince')}: {user?.date_joined}</p>
      </div>
    </HomeTemplate>
  );
};

export default Profile;