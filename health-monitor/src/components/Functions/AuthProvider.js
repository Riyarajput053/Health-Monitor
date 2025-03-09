import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevent flickering due to state reset

  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const authToken = getAuthToken();

    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setUser({ userId: decoded.userId, role: decoded.role });
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      fetchUserFromServer();
    }
    setLoading(false);
  }, []);

  const getAuthToken = () => {
    return getCookie("authToken") || localStorage.getItem("authToken");
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
  };

  const fetchUserFromServer = async () => {
    try {
      const response = await axios.get(`${API_URL}/User/me`, { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error("Session expired or user not found:", error);
      logout();
    }
  };

  const logout = async () => {
    try {
      await axios.get( `${API_URL}/User/logout`, { withCredentials: true });

      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("authToken");

      setUser(null);
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {!loading && children} {/* Prevent UI flicker */}
    </AuthContext.Provider>
  );
};


