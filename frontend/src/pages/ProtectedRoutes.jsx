import { Navigate } from 'react-router-dom';

import { useUserContext } from '../contexts/userContext';
const ProtectedRoutes = ({ children }) => {
  const { userInfo } = useUserContext();

  return userInfo ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
