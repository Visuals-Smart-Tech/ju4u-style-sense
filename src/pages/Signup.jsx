
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SignupForm from '@/components/auth/SignupForm';

export default function Signup() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to account page
  useEffect(() => {
    if (currentUser) {
      navigate('/account');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <SignupForm />
      </div>
    </div>
  );
}
