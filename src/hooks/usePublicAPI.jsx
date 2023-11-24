import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:6001",
});
const usePublicAPI = () => {
  return axiosAPI;
};

export default usePublicAPI;
