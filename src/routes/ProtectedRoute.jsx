import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (!isAuthenticated) {
    const targetLogin = adminOnly ? "/admin/login" : "/login";
    return <Navigate to={targetLogin} state={{ from: location }} replace />;
  }
  if (adminOnly && user?.role !== "admin") {
    return /* @__PURE__ */ React.createElement(Navigate, { to: "/", replace: true });
  }
  return children;
};
