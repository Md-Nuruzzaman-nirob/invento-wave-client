import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:6001",
  // baseURL: "https://invento-wave-server.vercel.app",
});

const useSecureAPI = () => {
  return axiosAPI;
};

export default useSecureAPI;
