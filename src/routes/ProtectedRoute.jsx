import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../utils/localStorage";

const ProtectedRoute = ({ requiredRole }) => {
  const userId = storage.getUserId();
  const userRole = storage.getUserRole();



  return <Outlet />;
};

export default ProtectedRoute;
