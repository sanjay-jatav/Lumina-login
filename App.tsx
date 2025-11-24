import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { AuthState, AuthStatus, User } from './types';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    status: AuthStatus.IDLE,
    user: null,
    error: null,
  });

  // Simulate persistent login checking
  useEffect(() => {
    const savedUser = localStorage.getItem('lumina_user');
    if (savedUser) {
      setAuthState({
        status: AuthStatus.SUCCESS,
        user: JSON.parse(savedUser),
        error: null,
      });
    }
  }, []);

  const handleLogin = async (email: string) => {
    setAuthState(prev => ({ ...prev, status: AuthStatus.LOADING, error: null }));

    // Simulate network request delay
    setTimeout(() => {
      // Mock validation: Fail if email contains "error"
      if (email.includes('error')) {
        setAuthState({
          status: AuthStatus.ERROR,
          user: null,
          error: 'Invalid credentials. Please try again.',
        });
      } else {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Demo User',
          email: email,
        };
        
        localStorage.setItem('lumina_user', JSON.stringify(mockUser));
        
        setAuthState({
          status: AuthStatus.SUCCESS,
          user: mockUser,
          error: null,
        });
      }
    }, 1500); // 1.5s artificial delay for realism
  };

  const handleLogout = () => {
    localStorage.removeItem('lumina_user');
    setAuthState({
      status: AuthStatus.IDLE,
      user: null,
      error: null,
    });
  };

  if (authState.status === AuthStatus.SUCCESS && authState.user) {
    return <Dashboard user={authState.user} onLogout={handleLogout} />;
  }

  return (
    <LoginPage 
      onLogin={handleLogin} 
      status={authState.status} 
      error={authState.error} 
    />
  );
};

export default App;