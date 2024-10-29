import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;
