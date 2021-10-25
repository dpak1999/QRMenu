/** @format */

import { createContext, useState } from 'react';
import { login } from '../apis';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('qr_token'));
  const [loading, setLoading] = useState(false);

  const signIn = async (username, password, callback) => {
    setLoading(true);
    const response = await login(username, password);

    if (response && response.auth_token) {
      localStorage.setItem('qr_token', response.auth_token);
      setToken(response.auth_token);
      callback();
    }

    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('qr_token');
    setToken('');
  };

  const value = {
    token,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
