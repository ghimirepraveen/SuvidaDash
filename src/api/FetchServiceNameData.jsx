import axiosInstance from "./axiosInstance";

const fetchServiceName = async (query) => {
  try {
    const finalQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    console.log("API Query Params:", finalQuery);

    const response = await axiosInstance.get("/service/servicename/filter", {
      params: finalQuery,
    });

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetchServiceName:", error);
    throw error;
  }
};

const addServiceName = async (data) => {
  try {
    const response = await axiosInstance.post("/service/servicename", data);
    return response.data;
  } catch (error) {
    console.error("Error in addServiceName:", error);
    throw error;
  }
};
const updateServiceName = async (id, updatedData) => {
  const response = await axiosInstance.put(
    `/service/servicename/${id}`,
    updatedData
  );
  return response.data;
};

const getServiceNameDetails = async (id) => {
  const response = await axiosInstance.get(`/service/servicename/${id}`);
  return response.data;
};
export {
  fetchServiceName,
  addServiceName,
  updateServiceName,
  getServiceNameDetails,
};
