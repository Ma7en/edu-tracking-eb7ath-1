import { useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { apiClient } from '@/lib/api';

export function useAuth() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (phone: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await apiClient.login(phone, password);
        setLocation('/dashboard');
      } catch (err: any) {
        const errorMessage = err.response?.data?.detail || 'فشل تسجيل الدخول';
        setError(errorMessage);
        console.error('Login error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [setLocation]
  );

  const logout = useCallback(() => {
    apiClient.logout();
    setLocation('/login');
  }, [setLocation]);

  const isAuthenticated = apiClient.isAuthenticated();

  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
    error,
  };
}
