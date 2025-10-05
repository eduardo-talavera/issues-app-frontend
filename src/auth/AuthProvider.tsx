/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setAccessToken } from './tokenStore';

type AuthContextType = {
  accessToken: string | null;
  user: UserSession;
  saveToken: (accessToken: string) => void;
  clearToken: () => void;
  saveUser: (accessToken: string) => void;
};

export type UserSession = {
  name: string;
  email: string;
};
const userLs = JSON.parse(localStorage.getItem('user')!);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState({
    name: userLs?.name ?? '',
    email: userLs?.email ?? '',
  });

  const saveToken = (accessToken: string) => {
    /* guardamos en memoria para que sea 
    accesible en los interceptores de axios */
    setAccessToken(accessToken); 
    /* el token no se persiste por seguridad, 
    en vez de eso se obtiene uno nuevo con el 
    refresh token persistido en las cookies */
    setToken(accessToken); 
  }

  const clearToken = () => {
    setAccessToken(null); 
    setToken(null); 
  };

  /** Guardamos datos del usuario contenidos en el payload del token, 
   * para que sean accesibles durante la sesion dado que el token
   * no se persiste y se pierde entre recargas de pagina
   * actualizamos en cada inicio de sesion */
  const saveUser = (accessToken: string) => {
    const { email, name } = jwtDecode<UserSession>(accessToken);
    setUser({ name, email });
    localStorage.setItem('user', JSON.stringify({ name, email }))
  }

  return (
    <AuthContext.Provider
      value={{ accessToken: token, user, saveToken, clearToken, saveUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe ser usado con AuthProvider');
  return ctx;
};
