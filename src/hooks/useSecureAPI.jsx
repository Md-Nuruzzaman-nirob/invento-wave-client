import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:6001",
});

const useSecureAPI = () => {
  return axiosAPI;
};

export default useSecureAPI;
