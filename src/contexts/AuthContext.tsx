'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/services/api';

type User = {
  role: 'admin' | 'staff';
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async (email: string, password: string) => {
    const { data } = await apiService.auth.login({ email, password });
    console.log("login",data);
    localStorage.setItem('authToken', data.token);
    setUser({ role: data.role, email });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);