import axiosInstance from "./axiosInstance";

const fetchServiceName = async (query) => {
  const { filter, ...filteredQuery } = query;
  const finalQuery = Object.fromEntries(
    Object.entries(filteredQuery).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  );
  const response = await axiosInstance.get("/service/servicename/filter", {
    params: finalQuery,
  });
  return response.data;
};

export default fetchServiceName;
