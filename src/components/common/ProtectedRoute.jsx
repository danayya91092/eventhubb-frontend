import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children, allowedRoles = [] }) => {
  const { admin, loading } = useAuth();
  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;
  if (!admin) return <Navigate to="/admin/login" />;
  if (allowedRoles.length && !allowedRoles.includes(admin.role)) {
    return <div className="container py-5 text-center"><h3>Access Denied</h3><p>You don't have permission for this page.</p></div>;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};
