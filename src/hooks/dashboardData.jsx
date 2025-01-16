import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchDashboardData } from "../api/FetchDashboardData";

export const useDashboardData = () => {
  const fetchFunction = fetchDashboardData;
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => fetchFunction(),
    onError: (error) => {
      console.error("Error fetching dashboard data:", error);
    },
  });
};
