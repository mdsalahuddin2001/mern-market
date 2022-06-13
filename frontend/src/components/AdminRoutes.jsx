import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

const AdminRoutes = ({ children }) => {
  const { userInfo } = useUserContext();
  return userInfo && userInfo.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
