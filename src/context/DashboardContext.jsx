import React, { createContext, useContext } from "react";
import { useDashboardData } from "../hooks/dashboardData";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { data, isError, error, isLoading } = useDashboardData();

  return (
    <DashboardContext.Provider value={{ data, isError, error, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
