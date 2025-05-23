
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProfilePage from '@/components/profile/ProfilePage';

const Account = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/account' } });
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null; // Don't render anything while redirecting
  }
  
  return <ProfilePage />;
};

export default Account;
