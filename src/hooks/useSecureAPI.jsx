import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://invento-wave-server.vercel.app",
});

const useSecureAPI = () => {
  return axiosAPI;
};

export default useSecureAPI;
