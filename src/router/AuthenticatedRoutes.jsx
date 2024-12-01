import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import NotAuthorized from "../components/NotAuthorized"; // Correct import statement

const AuthenticatedRoutes = ({ children }) => {
  const { user } = useUser();

  if (!user || !user.data) {
    return <Navigate to="/login" />;
  }

  return user.data.role === "Admin" ? children : <NotAuthorized />;
};

export default AuthenticatedRoutes;
