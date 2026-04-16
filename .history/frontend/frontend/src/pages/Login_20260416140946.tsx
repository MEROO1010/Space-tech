// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HomeTemplate from '../components/templates/HomeTemplate';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useDispatch } from 'react-redux';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <HomeTemplate>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('login')}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
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
          {t('login')}
        </Button>
      </form>
    </HomeTemplate>
  );
};

export default Login;