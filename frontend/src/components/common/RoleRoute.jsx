import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from './Loader.jsx';

export const RoleRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader text="Verifying permissions..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    const fallback =
      user?.role === 'admin'
        ? '/admin/dashboard'
        : user?.role === 'employer'
          ? '/employer/dashboard'
          : '/dashboard';

    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default RoleRoute;
