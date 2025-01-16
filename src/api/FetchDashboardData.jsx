import axiosInstance from "./axiosInstance";

const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get("/auth/data");
    return response.data;
  } catch (error) {
    console.error("Error in fetchDashboardData:", error);
    throw error;
  }
};

export { fetchDashboardData };
