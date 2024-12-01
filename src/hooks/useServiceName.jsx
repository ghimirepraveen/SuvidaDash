import { useQuery } from "react-query";
import fetchServiceName from "../api/FetchServiceNameData";

const useServiceNameData = (query) => {
  return useQuery({
    queryKey: ["serviceData", query],
    queryFn: () => fetchServiceName(query),
    onError: (error) => {
      console.error("Error fetching service name data:", error);
    },
  });
};

export default useServiceNameData;
