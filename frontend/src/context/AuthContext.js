import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      // Fetch user data
      axios.get('http://localhost:8000/api/user/')
        .then(response => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Auth error:', error);
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setToken(null);
            setAuthToken(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', credentials);
      const { access } = response.data;
      localStorage.setItem('token', access);
      setToken(access);
      setAuthToken(access);
      const userResponse = await axios.get('http://localhost:8000/api/user/');
      setUser(userResponse.data);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('http://localhost:8000/api/register/', userData);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAuthToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 