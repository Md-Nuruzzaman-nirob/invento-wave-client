import axios from "axios";
import useAuth from "./useAuth";
import { NavLink } from "react-router-dom";

const axiosAPI = axios.create({
  // baseURL: "http://localhost:6001",
  baseURL: "https://invento-wave-server.vercel.app",
});

const useSecureAPI = () => {
  const { logout } = useAuth();
  axiosAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt-access-token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  // interceptors 401 403
  axiosAPI.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response.status;
      if (status === 401) {
        <NavLink to={"/error/unauthorized"}></NavLink>;
      }
      if (status === 403) {
        <NavLink to={"/error/unauthorized"}></NavLink>;
      }
      logout();
    }
  );

  return axiosAPI;
};

export default useSecureAPI;
