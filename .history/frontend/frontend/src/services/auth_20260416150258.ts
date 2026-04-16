// frontend/src/services/auth.ts
import API from './api';
import { User } from '../types/user';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await API.post('/users/login/', { email, password });
  return response.data;
};

export const register = async (userData: { email: string; password: string; name: string }): Promise<RegisterResponse> => {
  const response = await API.post('/users/register/', userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await API.get('/users/me/');
  return response.data;
};