import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/User/authuser', { withCredentials: true });
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
