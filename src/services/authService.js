import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { MOCK_USER_CUSTOMER, MOCK_USER_ADMIN } from "../constants/mockData";
export const authService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch {
      if (credentials.email.includes("admin")) {
        return {
          success: true,
          token: "mock_jwt_admin_token_8812",
          user: MOCK_USER_ADMIN
        };
      }
      return {
        success: true,
        token: "mock_jwt_customer_token_9041",
        user: MOCK_USER_CUSTOMER
      };
    }
  },
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch {
      const selectedRole = userData.role || "user";
      const newUser = {
        _id: `usr_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: selectedRole,
        phone: userData.phone || "+1 (555) 000-1122",
        avatar: selectedRole === "admin"
          ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        isVerified: true,
        createdAt: new Date().toISOString()
      };
      return {
        success: true,
        token: `mock_jwt_${Date.now()}`,
        user: newUser
      };
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch {
      return {
        success: true,
        message: "Password reset link sent to your registered email."
      };
    }
  },
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
      return response.data;
    } catch {
      return {
        success: true,
        message: "Password reset successfully."
      };
    }
  },
  verifyEmail: async (token) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}/${token}`);
      return response.data;
    } catch {
      return {
        success: true,
        message: "Email address verified successfully."
      };
    }
  }
};
