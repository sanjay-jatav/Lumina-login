import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import { AuthStatus } from '../types';

interface LoginPageProps {
  onLogin: (email: string) => void;
  status: AuthStatus;
  error: string | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, status, error }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!isLoginMode && !formData.name) {
      errors.name = "Full name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onLogin(formData.email);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      name: 'Demo User',
      email: 'demo@lumina.com',
      password: 'password123'
    });
    setIsLoginMode(true);
    setFormErrors({});
  };

  // Reset errors when switching modes
  useEffect(() => {
    setFormErrors({});
    if (!isLoginMode) {
        setFormData({ name: '', email: '', password: '' });
    }
  }, [isLoginMode]);

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      
      {/* Left Side - Artistic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 text-white p-12 flex-col justify-between">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1200/1600?grayscale&blur=2" 
            alt="Background" 
            className="object-cover w-full h-full opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/90 via-primary-800/80 to-purple-900/80 mix-blend-multiply" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-slate-400 rounded-lg" />
            Lumina
          </div>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Experience the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-purple-200">
              Future of Design
            </span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Join thousands of developers and designers building the next generation of web applications with Lumina's advanced toolkit.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <img 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-slate-900" 
                  src={`https://picsum.photos/100/100?random=${i}`} 
                  alt="User" 
                />
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold">10k+ Users</span>
              <span className="text-xs text-slate-400">Trusted globally</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500 font-medium">
          © 2024 Lumina Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8 animate-[fadeIn_0.5s_ease-out]">
          
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {isLoginMode ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-slate-500">
              {isLoginMode 
                ? 'Enter your credentials to access your account' 
                : 'Enter your details to get started for free'}
            </p>
          </div>

          {/* Demo Credentials Box */}
          <div 
            onClick={fillDemoCredentials}
            className="p-4 bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-100 rounded-xl flex items-start gap-3 cursor-pointer hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={48} />
            </div>
            <div className="bg-white p-2 rounded-lg text-primary-600 shadow-sm ring-1 ring-black/5">
              <Zap size={20} fill="currentColor" className="text-primary-500" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-primary-800 uppercase tracking-wide mb-0.5">Quick Demo Access</p>
              <p className="text-sm text-slate-600">
                Tap to auto-fill: <span className="font-mono font-medium text-slate-900">demo@lumina.com</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginMode && (
              <Input
                label="Full Name"
                placeholder="John Doe"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                error={formErrors.name}
              />
            )}

            <Input
              label="Email Address"
              placeholder="name@company.com"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              error={formErrors.email}
            />

            <div className="space-y-1">
              <Input
                label="Password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={formErrors.password}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              {isLoginMode && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 flex items-center gap-2">
                <ShieldCheck size={16} />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              isLoading={status === AuthStatus.LOADING}
              className="mt-2"
            >
              {isLoginMode ? 'Sign In' : 'Create Account'} 
              {!isLoginMode && <ArrowRight size={16} className="ml-2" />}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-2 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <svg className="h-4 w-4 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12.0003 20.45c-4.67 0-8.4503-3.78-8.4503-8.45 0-4.67 3.7803-8.45 8.4503-8.45 4.67 0 8.4503 3.78 8.4503 8.45 0 4.67-3.7803 8.45-8.4503 8.45z" fill="currentColor" fillOpacity=".1"/>
                <path d="M20.28 12.4497c0-.61-.05-1.21-.15-1.79h-8.13v3.39h4.65c-.2 1.08-.8 1.99-1.71 2.61v2.16h2.77c1.62-1.49 2.57-3.69 2.57-6.37z" fill="#4285F4"/>
                <path d="M12.0003 20.8997c2.33 0 4.28-.77 5.71-2.1l-2.77-2.16c-.77.52-1.76.82-2.94.82-2.27 0-4.19-1.53-4.88-3.59h-2.86v2.22c1.41 2.8 4.29 4.81 7.74 4.81z" fill="#34A853"/>
                <path d="M7.1203 13.8697c-.18-.53-.28-1.09-.28-1.67 0-.58.1-1.14.28-1.67v-2.22h-2.86c-.58 1.15-.91 2.45-.91 3.89 0 1.44.32 2.74.91 3.89l2.86-2.22z" fill="#FBBC05"/>
                <path d="M12.0003 7.0497c1.27 0 2.41.44 3.3 1.29l2.48-2.48c-1.5-1.4-3.44-2.25-5.78-2.25-3.45 0-6.33 2.01-7.74 4.81l2.86 2.22c.69-2.06 2.61-3.59 4.88-3.59z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
               <svg className="h-4 w-4 mr-2 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
              Facebook
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                {isLoginMode ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;