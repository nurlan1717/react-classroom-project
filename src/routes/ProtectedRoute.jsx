import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../utils/localStorage";

const ProtectedRoute = ({ requiredRole }) => {
  const userId = storage.getUserId(); 
  const userRole = storage.getUserRole(); 

  if (!userId) {
   
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
   
    return <Navigate to="*" />;
  }

 
  return <Outlet />;
};

export default ProtectedRoute;
