import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_BASE_URL = "http://localhost:3001/api/auth"; // Ganti dengan URL deployment

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setToken(savedToken);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
  try {
    setIsLoading(true);

    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    return { success: true, user };
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Login gagal",
    };
  } finally {
    setIsLoading(false);
  }
}, []);

  const register = useCallback(async (userData) => {
  try {
    setIsLoading(true);

    const response = await axios.post(`${API_BASE_URL}/register`, userData);

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    return { success: true, user };
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Registrasi gagal",
    };
  } finally {
    setIsLoading(false);
  }
}, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      token,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user && !!token,
    }),
    [user, token, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;