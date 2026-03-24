import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { apiClient } from '@/lib/api';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    if (!apiClient.isAuthenticated()) {
      setLocation('/login');
    }
  }, [setLocation]);

  // Don't render children until we've checked auth
  if (!apiClient.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
