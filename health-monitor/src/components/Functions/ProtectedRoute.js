import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
   
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'patient') {
      return <Navigate to="/patient-dashboard" />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/doctor-dashboard" />;
    }
  }

  return children;
};

export default ProtectedRoute;