import { useQuery } from "@tanstack/react-query";
import useSecureAPI from "./useSecureAPI";

const useFetchSecure = (url, key) => {
  const axiosSecure = useSecureAPI();
  const { data, refetch, isLoading, isPending } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  return { data, refetch, isPending, isLoading };
};

export default useFetchSecure;
