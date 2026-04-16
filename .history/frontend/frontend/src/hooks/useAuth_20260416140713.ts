// frontend/src/hooks/useAuth.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { login as loginApi, register as registerApi, getCurrentUser as getCurrentUserApi } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: () => {
      dispatch(clearUser());
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
  };

  const login = (email: string, password: string) => {
    return loginMutation.mutateAsync({ email, password });
  };

  const register = (userData: { email: string; password: string; name: string }) => {
    return registerMutation.mutateAsync(userData);
  };

  return {
    user: currentUser || user,
    login,
    register,
    logout,
    isLoading: loginMutation.isLoading || registerMutation.isLoading,
    error: loginMutation.error || registerMutation.error,
  };
};