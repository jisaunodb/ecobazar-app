import axios from "axios";
import { getStorageItem, STORAGE_KEYS } from "../utils/storage";
const API_URL = import.meta.env.VITE_API_URL || "https://api.ecobazar.com/v1";
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 1e4
});
apiClient.interceptors.request.use(
  (config) => {
    const token = getStorageItem(STORAGE_KEYS.TOKEN, null);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - session token expired");
    }
    return Promise.reject(error);
  }
);
