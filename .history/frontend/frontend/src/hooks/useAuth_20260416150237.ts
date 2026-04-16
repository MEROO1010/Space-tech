// frontend/src/hooks/useAuth.ts
import { useQuery, useMutation, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { login as loginApi, register as registerApi, getCurrentUser as getCurrentUserApi } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice';
import { RootState } from '../store/store';
import { User } from '../types/user';
import React from 'react';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: currentUser, isLoading: isUserLoading }: UseQueryResult<User, Error> = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
    retry: false,
  });

  const loginMutation: UseMutationResult<LoginResponse, Error, { email: string; password: string }> = useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => loginApi(email, password),
  });

  const registerMutation: UseMutationResult<RegisterResponse, Error, { email: string; password: string; name: string }> = useMutation<RegisterResponse, Error, { email: string; password: string; name: string }>({
    mutationFn: (userData) => registerApi(userData),
  });

  React.useEffect(() => {
    if (currentUser) {
      dispatch(setUser(currentUser));
    } else {
      dispatch(clearUser());
    }
  }, [currentUser, dispatch]);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginMutation.mutateAsync({ email, password });
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    try {
      const data = await registerMutation.mutateAsync(userData);
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    user: currentUser || user,
    login,
    register,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending || isUserLoading,
    error: loginMutation.error || registerMutation.error,
  };
};