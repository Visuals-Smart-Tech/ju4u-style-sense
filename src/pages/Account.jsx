import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Demo authentication - in a real app, you would connect to an auth service
    if (isLogin) {
      // Mock login
      toast.success("Login successful!");
      console.log("Login attempt", { email, password });
    } else {
      // Mock registration
      toast.success("Account created successfully!");
      console.log("Register attempt", { name, email, password });
      setIsLogin(true);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Sign In to Your Account' : 'Create an Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {isLogin && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-ju4u-coral hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-ju4u-black hover:bg-black py-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-ju4u-coral hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="py-6">
              Google
            </Button>
            <Button variant="outline" className="py-6">
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
