import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchOrgData,
  fetchRequestedOrgData,
  fetchServiceData,
  fetchOrgDetails,
  updateOrgStatus,
  blockOrganization,
} from "../api/FetchOrgeData";

export const useOrgData = (query, dataSource) => {
  const fetchFunction =
    dataSource === "requested" ? fetchRequestedOrgData : fetchOrgData;

  return useQuery({
    queryKey: ["orgData", dataSource, query],
    queryFn: () => fetchFunction(query),
    onError: (error) => {
      console.error("Error fetching organization data:", error);
    },
  });
};
// Inside useServiceListing
export const useServiceListing = (query, organizationId) => {
  console.log("useServiceListing called with:", query, organizationId); // Add this log
  return useQuery({
    queryKey: ["serviceData", organizationId, query],
    queryFn: () => fetchServiceData(query, organizationId),
    onError: (error) => {
      console.error("Error fetching service data:", error);
    },
    enabled: !!organizationId, // Only run if organizationId is defined
  });
};

export const useOrgDetails = (organizationId) => {
  return useQuery({
    queryKey: ["serviceDetails", organizationId],
    queryFn: () => fetchOrgDetails(organizationId),
    onError: (error) => {
      console.error("Error fetching service details:", error);
    },
  });
};

export const useUpdateOrgStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrgStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceDetails"]);
    },
    onError: (error) => {
      console.error("Error updating service status:", error);
    },
  });
};

export const useBlockOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blockOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceDetails"]);
    },
    onError: (error) => {
      console.error("Error blocking organization:", error);
    },
  });
};
