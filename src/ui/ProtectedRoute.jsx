import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // if not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('login', { replace: true });
  }, [isLoading, isAuthenticated, navigate]);

  // show spinner while loadin
  if (isLoading) return <Spinner />;

  // if authenticated, render app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
