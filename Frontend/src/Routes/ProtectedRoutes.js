import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 
  
  // Check if token exists
  if (!token) {
    return <Navigate to="/login" />;
  }

  console.log(allowedRoles , userRole);

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if(token){
        return <Navigate to="/author" />
    }
    return <Navigate to="/" />; // Redirect to home or another page if role is not allowed
  }

  return <Outlet />; // Render the child routes if authorized
};

export default ProtectedRoute;
