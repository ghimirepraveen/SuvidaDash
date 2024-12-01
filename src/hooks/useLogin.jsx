import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const fetchAdditionalUserData = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const useLogin = (setUser) => {
  return useMutation({
    mutationFn: async (loginData) => {
      const response = await axiosInstance.post("/auth/login", loginData);
      const { user, accessToken, refreshToken } = response.data.data;

      storeTokens(accessToken, refreshToken);

      const additionalUserData = await fetchAdditionalUserData();

      setUser(additionalUserData);

      return user;
    },
    onError: (error) => {
      console.error("Login mutation failed with error:", error);
    },
  });
};
