import axiosInstance from "./axiosInstance";

const fetchServiceData = async (query) => {
  const { filter, ...filteredQuery } = query;
  const finalQuery = Object.fromEntries(
    Object.entries(filteredQuery).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  );

  const response = await axiosInstance.get("/service/details", {
    params: finalQuery,
  });
  return response.data;
};

const fetchRequestedServiceData = async (query) => {
  const { filter, ...filteredQuery } = query;
  const finalQuery = Object.fromEntries(
    Object.entries(filteredQuery).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  );

  const response = await axiosInstance.get("/service/requested", {
    params: finalQuery,
  });
  return response.data;
};

const fetchServiceDetails = async (serviceId) => {
  const response = await axiosInstance.get(`/service/${serviceId}`);
  return response.data;
};

const updateServiceStatus = async ({ serviceId, status, action, message }) => {
  const endpoint =
    action === "reject"
      ? `/service/rejectservice/${serviceId}`
      : `/service/acceptservice/${serviceId}`;

  const body = {
    status,
    ...(action === "reject" && { message }),
  };

  const response = await axiosInstance.put(endpoint, body);
  return response.data;
};
const blockService = async ({ serviceId }) => {
  const response = await axiosInstance.put(
    `/service/chnageblockstatus/${serviceId}`
  );
  return response.data;
};

export {
  fetchRequestedServiceData,
  fetchServiceData,
  fetchServiceDetails,
  updateServiceStatus,
  blockService,
};
