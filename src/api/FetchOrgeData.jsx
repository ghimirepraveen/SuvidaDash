import axiosInstance from "./axiosInstance";

const fetchOrgData = async (query) => {
  const { filter, ...filteredQuery } = query;
  const finalQuery = Object.fromEntries(
    Object.entries(filteredQuery).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  );

  const response = await axiosInstance.get("/org", { params: finalQuery });
  return response.data;
};

const fetchServiceData = async (query, organizationId) => {
  console.log("fetchServiceData called with:", query, organizationId);
  try {
    const response = await axiosInstance.get(`/service/org/${organizationId}`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetchServiceData:", error);
    throw error;
  }
};

const fetchRequestedOrgData = async (query) => {
  const { ...filteredQuery } = query;
  const finalQuery = Object.fromEntries(
    Object.entries(filteredQuery).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  );

  const response = await axiosInstance.get("/org/getrequest", {
    params: finalQuery,
  });
  return response.data;
};

const fetchOrgDetails = async (organizationId) => {
  const response = await axiosInstance.get(`/org/${organizationId}`);
  return response.data;
};

const updateOrgStatus = async ({ organizationId, status, action, message }) => {
  const endpoint =
    action === "reject"
      ? `/org/rejectorg/${organizationId}`
      : `/org/verifyorg/${organizationId}`;

  const body = {
    status,
    ...(action === "reject" && { message }),
  };

  const response = await axiosInstance.put(endpoint, body);
  return response.data;
};

const blockOrganization = async ({ organizationId, status }) => {
  const response = await axiosInstance.put(
    `/org/changeblockstauts/${organizationId}`,
    {
      status,
    }
  );
  return response.data;
};

export {
  fetchOrgData,
  fetchRequestedOrgData,
  fetchOrgDetails,
  updateOrgStatus,
  blockOrganization,
  fetchServiceData,
};
