// frontend/src/hooks/useAuth.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { login as loginApi, register as registerApi, getCurrentUser as getCurrentUserApi } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice';
import { RootState } from '../store/store';
import { User } from '../types/user';

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

  const { data: currentUser, isLoading: isUserLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: () => {
      dispatch(clearUser());
    },
  });

  const loginMutation = useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
    },
  });

  const registerMutation = useMutation<RegisterResponse, Error, { email: string; password: string; name: string }>({
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
    isLoading: loginMutation.status === 'loading' || registerMutation.status === 'loading' || isUserLoading,
    error: loginMutation.error || registerMutation.error,
  };
};