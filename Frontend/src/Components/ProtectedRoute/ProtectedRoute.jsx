import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  if (isAuthenticated === true) {
    return <Outlet />;
  }
  return <Navigate to={"/"} key={1} />;
};

export default ProtectedRoute;
