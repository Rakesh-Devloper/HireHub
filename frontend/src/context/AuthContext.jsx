import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hirehub_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize or fetch current logged in user
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('hirehub_token');
      const storedUser = localStorage.getItem('hirehub_user');

      if (storedToken && storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setToken(storedToken);

          // Verify the token with the backend. Invalid/expired sessions are cleared.
          const res = await authService.getCurrentUser();
          if (res?.data) {
            setUser(res.data);
            localStorage.setItem('hirehub_user', JSON.stringify(res.data));
          } else {
            throw new Error('Session verification failed');
          }
        } catch (err) {
          console.warn('Session verification failed:', err.message);
          setUser(null);
          setToken(null);
          localStorage.removeItem('hirehub_token');
          localStorage.removeItem('hirehub_user');
        }
      } else {
        // Start clean with no pre-authenticated default user
        setUser(null);
        setToken(null);
        localStorage.removeItem('hirehub_token');
        localStorage.removeItem('hirehub_user');
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('hirehub_token', res.data.token);
        localStorage.setItem('hirehub_user', JSON.stringify(res.data.user));
        return { success: true, user: res.data.user };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Failed to login',
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('hirehub_token', res.data.token);
        localStorage.setItem('hirehub_user', JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Failed to register',
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hirehub_token');
    localStorage.removeItem('hirehub_user');
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await authService.updateProfile(profileData);
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('hirehub_user', JSON.stringify(res.data));
        return { success: true, data: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Failed to update profile',
      };
    }
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...updatedFields };
      localStorage.setItem('hirehub_user', JSON.stringify(updated));
      return updated;
    });
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user),
        role: user?.role || 'jobseeker',
        login,
        register,
        logout,
        updateProfile,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
