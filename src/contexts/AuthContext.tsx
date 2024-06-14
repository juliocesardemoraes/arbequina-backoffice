'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuthState = localStorage.getItem('isAuthenticated');
      if (savedAuthState) {
        setIsAuthenticated(JSON.parse(savedAuthState));
      }
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true');
    }
    toast({
      title: 'Success',
      description: 'Logged in successfully.'
    });
    router.push('/painel');
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenAdmin');
    }
    toast({
      title: 'Bye',
      description: 'We look forward to seeing you soon.'
    });
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};