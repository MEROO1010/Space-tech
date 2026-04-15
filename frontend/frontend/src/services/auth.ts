// frontend/src/services/auth.ts
import API from './api';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await API.post('/users/login/', { email, password });
  return response.data;
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
}): Promise<LoginResponse> => {
  const response = await API.post('/users/register/', userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<any> => {
  const response = await API.get('/users/me/');
  return response.data;
};