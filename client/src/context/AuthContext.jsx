import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
  }, [token, userName]);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      setToken(response.data.token);
      setUserName(response.data.userName);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setToken("");
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};