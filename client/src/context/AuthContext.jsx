import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { AUTH_LOGIN } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      setIsLoggedIn(false);
    }
  }, [token, userName]);

  const login = async (credentials) => {
    try {
      const response = await axios.post(AUTH_LOGIN, credentials);
      setToken(response.data.token);
      setUserName(response.data.userName);
      
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    setToken("");
    setUserName("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ token, userName, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};