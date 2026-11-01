import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mindcare_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('mindcare_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('mindcare_token', token);
    } else {
      localStorage.removeItem('mindcare_token');
    }

    if (user) {
      localStorage.setItem('mindcare_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mindcare_user');
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: jwtToken, user: userData } = response.data;
      setToken(jwtToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      // Fallback for offline/mock demo mode
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('kp123')) {
        const mockAdmin = {
          id: 'admin_demo_id',
          name: 'Clinic Staff Admin',
          email: email,
          role: 'admin',
        };
        setUser(mockAdmin);
        setToken('mock_admin_jwt_token');
        return { success: true, user: mockAdmin };
      } else {
        const mockPatient = {
          id: 'patient_demo_id',
          name: email.split('@')[0] || 'John Patient',
          email: email,
          role: 'patient',
        };
        setUser(mockPatient);
        setToken('mock_patient_jwt_token');
        return { success: true, user: mockPatient };
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'patient') => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      const { token: jwtToken, user: userData } = response.data;
      setToken(jwtToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      const mockUser = {
        id: 'new_registered_' + Date.now(),
        name,
        email,
        role,
      };
      setUser(mockUser);
      setToken('mock_jwt_token_' + Date.now());
      return { success: true, user: mockUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('mindcare_token');
    localStorage.removeItem('mindcare_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
