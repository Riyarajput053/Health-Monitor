import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute() {
  const [authUser, setAuthUser] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/User/authuser`, { withCredentials: true });
        const { AuthUser } = response.data;
        setAuthUser(AuthUser);
      } catch (error) {
        console.error('Error fetching authenticated user:', error);
        setAuthUser(null);
      }
    };

    getAuthenticatedUser();
  }, []);
  
  return authUser ? <Outlet authUser={authUser} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
