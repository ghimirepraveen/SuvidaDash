import { useQuery } from "@tanstack/react-query";
import { fetchOrder, getOrderDetails } from "../api/FetchOrderData";

export const useOrderData = (query) => {
  return useQuery({
    queryKey: ["serviceData", query],
    queryFn: () => fetchOrder(query),
    onError: (error) => {
      console.error("Error fetching service name data:", error);
    },
    keepPreviousData: true,
  });
};

export const useOrderDetails = (BookingId) => {
  return useQuery({
    queryKey: ["BookingDetails", BookingId],
    queryFn: () => getOrderDetails(BookingId),
    onError: (error) => {
      console.error("Error fetching service details:", error);
    },
  });
};
