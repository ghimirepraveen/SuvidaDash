import { useMutation } from "react-query";
import axiosInstance from "../api/axiosInstance";

export const useRefreshToken = () => {
  return useMutation(async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) throw new Error("No refresh token found");

    const response = await axiosInstance.post("/auth/refresh", {
      token: storedRefreshToken,
    });
    const { accessToken } = response.data;

    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  });
};
