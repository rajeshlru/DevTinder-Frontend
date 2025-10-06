import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (user?._id || location.state?.signupSuccess) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
