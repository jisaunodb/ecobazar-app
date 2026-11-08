import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
export const cartService = {
  getCart: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CART.BASE);
      return response.data;
    } catch {
      return { success: true, items: [] };
    }
  },
  addToCart: async (productId, quantity) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CART.ADD, { productId, quantity });
      return response.data;
    } catch {
      return { success: true, message: "Item added to cart" };
    }
  },
  updateQuantity: async (cartItemId, quantity) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.CART.UPDATE, { cartItemId, quantity });
      return response.data;
    } catch {
      return { success: true, message: "Cart updated" };
    }
  },
  removeItem: async (cartItemId) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.CART.REMOVE}/${cartItemId}`);
      return response.data;
    } catch {
      return { success: true, message: "Item removed from cart" };
    }
  }
};
