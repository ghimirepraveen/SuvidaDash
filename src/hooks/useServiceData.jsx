// useServiceData.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchServiceData,
  fetchRequestedServiceData,
  fetchServiceDetails,
  updateServiceStatus,
  blockService,
} from "../api/FetchServiceData";

export const useServiceData = (query, dataSource) => {
  const fetchFunction =
    dataSource === "requested" ? fetchRequestedServiceData : fetchServiceData;

  return useQuery({
    queryKey: ["serviceData", dataSource, query],
    queryFn: () => fetchFunction(query),
    onError: (error) => {
      console.error("Error fetching organization data:", error);
    },
  });
};

export const useServiceDetails = (serviceId) => {
  return useQuery({
    queryKey: ["serviceDetails", serviceId],
    queryFn: () => fetchServiceDetails(serviceId),
    onError: (error) => {
      console.error("Error fetching service details:", error);
    },
  });
};

export const useUpdateServiceStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateServiceStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceDetails"]);
    },
    onError: (error) => {
      console.error("Error updating service status:", error);
    },
  });
};

export const useBlockService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blockService,
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceDetails"]);
    },
    onError: (error) => {
      console.error("Error blocking service:", error);
    },
  });
};
