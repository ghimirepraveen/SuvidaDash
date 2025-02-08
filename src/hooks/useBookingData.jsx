import { useQuery } from "@tanstack/react-query";
import { fetchBooking, getBookingDetails } from "../api/FetchBookingData";

export const useBookingData = (query) => {
  return useQuery({
    queryKey: ["serviceData", query],
    queryFn: () => fetchBooking(query),
    onError: (error) => {
      console.error("Error fetching service name data:", error);
    },
    keepPreviousData: true,
  });
};

export const useBookingDetails = (BookingId) => {
  return useQuery({
    queryKey: ["BookingDetails", BookingId],
    queryFn: () => getBookingDetails(BookingId),
    onError: (error) => {
      console.error("Error fetching service details:", error);
    },
  });
};
