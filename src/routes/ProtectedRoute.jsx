import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { storage } from "../utils/localStorage";

const ProtectedRoute = ({ requiredRole }) => {
  const userId = storage.getUserId();
  const userRole = storage.getUserRole();
  const navigate = useNavigate();

  // if (!userRole) {
  //   navigate("/login");
  // }
  // if (requiredRole === "student") {
  //   navigate("/student");
  // }

  return <Outlet />;
};

export default ProtectedRoute;
