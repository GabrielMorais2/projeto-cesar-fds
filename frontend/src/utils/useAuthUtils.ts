import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleAuthError = () => {
    navigate('/login');
  };

  return { handleAuthError };
};