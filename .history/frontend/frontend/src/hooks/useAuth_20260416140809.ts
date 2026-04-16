// frontend/src/hooks/useAuth.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { login as loginApi, register as registerApi, getCurrentUser as getCurrentUserApi } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice';

interface User {
  id?: number;
  email: string;
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

interface UseAuthReturn {
  user: User | undefined;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  isLoading: boolean;
  error: Error | null;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user) as User | undefined;

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
  });

  const { data: userFromQuery } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
  });

  React.useEffect(() => {
    if (userFromQuery) {
      dispatch(setUser(userFromQuery));
    } else {
      dispatch(clearUser());
    }
  }, [userFromQuery, dispatch]);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: AuthResponse) => {
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data: AuthResponse) => {
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
    },
  });

  const logout = (): void => {
    localStorage.removeItem('token');
    dispatch(clearUser());
  };

  const login = (email: string, password: string): Promise<AuthResponse> => {
    return loginMutation.mutateAsync({ email, password });
  };

  const register = (userData: RegisterData): Promise<AuthResponse> => {
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