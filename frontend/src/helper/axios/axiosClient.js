import axios from "axios";
import localStorageService from "../localStorage/localStorageService";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const refreshAccessToken = async (accessToken) => {
  try {
  } catch (error) {}
  return true;
};

axiosClient.interceptors.request.use(
  async (config) => {
    const acToken = localStorageService.getAccessToken();
    if (acToken) {
      config.headers["Authorization"] = "Bearer" + acToken;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response) {
      if (err.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = await refreshAccessToken();
        if (accessToken) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer" + accessToken;
          return axiosClient(originalRequest);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
