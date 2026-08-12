import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'cof_auth';

const readStoredAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Provides the current logged-in account (student or admin), authentication
 * status, and login/logout actions to the entire application.
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(readStoredAuth());
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setInitializing(false);
  }, []);

  const login = useCallback((token, user) => {
    const payload = { token, user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setAuth(payload);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }, []);

  const value = {
    token: auth?.token || null,
    user: auth?.user || null,
    role: auth?.user?.role || null,
    isAuthenticated: Boolean(auth?.token),
    isStudent: auth?.user?.role === 'student',
    isAdmin: auth?.user?.role === 'admin',
    initializing,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
