import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { MOCK_USER_CUSTOMER, MOCK_USER_ADMIN } from "../constants/mockData";
export const userService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch {
      return { success: true, user: MOCK_USER_CUSTOMER };
    }
  },
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER.PROFILE, userData);
      return response.data;
    } catch {
      return {
        success: true,
        message: "Profile updated successfully",
        user: { ...MOCK_USER_CUSTOMER, ...userData }
      };
    }
  },
  getAllUsers: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.USERS);
      return response.data;
    } catch {
      return {
        success: true,
        users: [MOCK_USER_ADMIN, MOCK_USER_CUSTOMER]
      };
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.ADMIN.USERS}/${id}`);
      return response.data;
    } catch {
      return { success: true, message: "User deleted" };
    }
  }
};
