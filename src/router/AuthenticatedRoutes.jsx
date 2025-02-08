import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import NotAuthorized from "../components/NotAuthorized";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const AuthenticatedRoutes = ({ children }) => {
  const { user } = useUser();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (user?.data?.role !== "Admin") {
    return <NotAuthorized />;
  }
  if (!accessToken || !refreshToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthenticatedRoutes;
