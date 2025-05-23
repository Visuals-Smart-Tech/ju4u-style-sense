
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your email inbox for password reset instructions');
      toast.success('Password reset email sent!');
    } catch (err) {
      setError('Failed to reset password');
      toast.error('Reset password failed', {
        description: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow-xl">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <p className="text-sm text-muted-foreground mt-1">Enter your email to receive a reset link</p>
      </div>
      
      {error && (
        <div className="bg-destructive/10 text-destructive rounded-md p-3 flex items-center gap-2 text-sm">
          <AlertCircle />
          <span>{error}</span>
        </div>
      )}
      
      {message && (
        <div className="bg-green-100 text-green-800 rounded-md p-3 flex items-center gap-2 text-sm">
          <span>{message}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          variant="accent"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2 mx-auto"
          onClick={() => navigate('/login')}
        >
          <ArrowLeft size={16} />
          <span>Back to Login</span>
        </Button>
      </div>
    </div>
  );
}
