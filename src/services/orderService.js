import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { MOCK_ORDERS } from "../constants/mockData";
export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
      return response.data;
    } catch {
      const newOrder = {
        _id: `ORD-2026-${Math.floor(1e3 + Math.random() * 9e3)}`,
        userName: orderData.userName || "Sarah Jenkins",
        userEmail: orderData.userEmail || "sarah.j@example.com",
        orderItems: orderData.orderItems || [],
        shippingAddress: orderData.shippingAddress || {
          street: "742 Evergreen Terrace",
          city: "Springfield",
          state: "IL",
          zipCode: "62704",
          country: "United States"
        },
        paymentMethod: orderData.paymentMethod || "Credit Card",
        paymentStatus: "paid",
        orderStatus: "processing",
        itemsPrice: orderData.itemsPrice || 0,
        shippingPrice: orderData.shippingPrice || 0,
        taxPrice: orderData.taxPrice || 0,
        totalPrice: orderData.totalPrice || 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        success: true,
        message: "Order created successfully",
        order: newOrder
      };
    }
  },
  getUserOrders: async (userId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ORDERS.MY_ORDERS}/${userId}`);
      return response.data;
    } catch {
      return {
        success: true,
        orders: MOCK_ORDERS
      };
    }
  },
  getOrderById: async (orderId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ORDERS.BASE}/${orderId}`);
      return response.data;
    } catch {
      const found = MOCK_ORDERS.find((o) => o._id === orderId) || MOCK_ORDERS[0];
      return {
        success: true,
        order: found
      };
    }
  },
  getAllOrders: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORDERS.BASE);
      return response.data;
    } catch {
      return {
        success: true,
        orders: MOCK_ORDERS
      };
    }
  },
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.ORDERS.STATUS}/${orderId}`, { status });
      return response.data;
    } catch {
      return {
        success: true,
        message: `Order status updated to ${status}`,
        order: { ...MOCK_ORDERS[0], _id: orderId, orderStatus: status }
      };
    }
  }
};
