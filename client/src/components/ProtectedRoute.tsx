import { ReactNode } from 'react';
import { useLocation } from 'wouter';
import { apiClient } from '@/lib/api';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  // Check if user is authenticated
  if (!apiClient.isAuthenticated()) {
    setLocation('/login');
    return null;
  }

  return <>{children}</>;
}
