import { useQuery } from "@tanstack/react-query";
import useSecureAPI from "./useSecureAPI";

const useFetchPublic = (url, key) => {
  const axiosSecure = useSecureAPI();
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  return { data, refetch, isPending, isLoading };
};

export default useFetchPublic;
