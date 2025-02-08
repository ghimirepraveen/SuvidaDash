import axiosInstance from "./axiosInstance";

const fetchOrder = async (query) => {
  try {
    const finalQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    const response = await axiosInstance.get("/order", {
      params: finalQuery,
    });

    return response.data;
  } catch (error) {
    console.error("Error in fetchBooking:", error);
    throw error;
  }
};
const getOrderDetails = async (id) => {
  const response = await axiosInstance.get(`/order/${id}`);
  return response.data;
};

export { fetchOrder, getOrderDetails };
