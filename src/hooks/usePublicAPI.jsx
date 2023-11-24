import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://invento-wave-server.vercel.app",
});
const usePublicAPI = () => {
  return axiosAPI;
};

export default usePublicAPI;
