import axiosInstance from "./axiosInstance";

const fetchBooking = async (query) => {
  try {
    const finalQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    const response = await axiosInstance.get("/booking", {
      params: finalQuery,
    });

    return response.data;
  } catch (error) {
    console.error("Error in fetchBooking:", error);
    throw error;
  }
};
const getBookingDetails = async (id) => {
  const response = await axiosInstance.get(`/booking/${id}`);
  return response.data;
};

export { fetchBooking, getBookingDetails };
