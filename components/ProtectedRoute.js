import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
