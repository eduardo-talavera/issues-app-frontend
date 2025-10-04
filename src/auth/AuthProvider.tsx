/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { setAccessToken } from './tokenStore';

type AuthContextType = {
  accessToken: string | null;
  saveToken: (accessToken: string) => Promise<void>;
  clearToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = async (accessToken: string) => {
    setAccessToken(accessToken);
    setToken(accessToken);
  };

  const clearToken = async () => {
    setAccessToken(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken: token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe ser usado con AuthProvider');
  return ctx;
};
