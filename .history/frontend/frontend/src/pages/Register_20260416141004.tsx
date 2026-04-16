// frontend/src/pages/Register.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HomeTemplate from '../components/templates/HomeTemplate';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useDispatch } from 'react-redux';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <HomeTemplate>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('register')}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-gray-700">{t('name')}</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="primary"
            size="md"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">{t('email')}</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="primary"
            size="md"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">{t('password')}</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="primary"
            size="md"
            className="w-full"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={false}
        >
          {t('register')}
        </Button>
      </form>
    </HomeTemplate>
  );
};

export default Register;