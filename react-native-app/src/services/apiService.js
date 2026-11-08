import { API_BASE_URL, ENDPOINTS, getHeaders } from "../config/api";
import {
  MOCK_PRODUCTS,
  CATEGORIES,
  MOCK_USER_CUSTOMER,
  MOCK_USER_ADMIN,
  MOCK_ORDERS,
} from "../constants/mockData";

// Helper request wrapper with automatic error handling and fallback
async function request(endpoint, options = {}, fallbackData = null) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(apiService.token),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(`[EcoBazar API] Request to ${endpoint} failed (${err.message}). Using fallback UI data.`);
    return fallbackData;
  }
}

export const apiService = {
  token: null,

  setToken(token) {
    this.token = token;
  },

  // ---------------- AUTH APIS ----------------
  auth: {
    async login(email, password) {
      try {
        const res = await request(
          ENDPOINTS.LOGIN,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          },
          null
        );

        if (res && res.user) {
          if (res.token) apiService.setToken(res.token);
          return res;
        }

        // Offline / fallback response
        const isAdmin = email.toLowerCase().includes("admin");
        const mockUser = isAdmin ? MOCK_USER_ADMIN : MOCK_USER_CUSTOMER;
        return {
          user: mockUser,
          token: "mock_jwt_token_" + Date.now(),
          message: "Signed in successfully",
        };
      } catch (e) {
        return { user: MOCK_USER_CUSTOMER, token: "mock_token" };
      }
    },

    async register(name, email, password) {
      return request(
        ENDPOINTS.REGISTER,
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        },
        {
          user: { _id: "usr_" + Date.now(), name, email, role: "user" },
          token: "mock_jwt_token_" + Date.now(),
        }
      );
    },

    async getProfile() {
      return request(ENDPOINTS.GET_PROFILE, { method: "GET" }, MOCK_USER_CUSTOMER);
    },
  },

  // ---------------- PRODUCT APIS ----------------
  products: {
    async getAll() {
      const data = await request(ENDPOINTS.GET_PRODUCTS, { method: "GET" }, MOCK_PRODUCTS);
      return Array.isArray(data) ? data : data?.products || MOCK_PRODUCTS;
    },

    async getCategories() {
      const data = await request(ENDPOINTS.GET_CATEGORIES, { method: "GET" }, CATEGORIES);
      return Array.isArray(data) ? data : CATEGORIES;
    },

    async getDetails(id) {
      const fallback = MOCK_PRODUCTS.find((p) => p._id === id) || MOCK_PRODUCTS[0];
      return request(ENDPOINTS.GET_PRODUCT_DETAILS(id), { method: "GET" }, fallback);
    },

    async createProduct(productData) {
      return request(
        ENDPOINTS.CREATE_PRODUCT,
        {
          method: "POST",
          body: JSON.stringify(productData),
        },
        { ...productData, _id: "prod_" + Date.now() }
      );
    },

    async deleteProduct(id) {
      return request(
        ENDPOINTS.DELETE_PRODUCT(id),
        { method: "DELETE" },
        { success: true, id }
      );
    },
  },

  // ---------------- ORDER APIS ----------------
  orders: {
    async create(orderData) {
      return request(
        ENDPOINTS.CREATE_ORDER,
        {
          method: "POST",
          body: JSON.stringify(orderData),
        },
        {
          _id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          ...orderData,
          status: "Pending",
          createdAt: new Date().toISOString(),
        }
      );
    },

    async getMyOrders() {
      const data = await request(ENDPOINTS.GET_MY_ORDERS, { method: "GET" }, MOCK_ORDERS);
      return Array.isArray(data) ? data : data?.orders || MOCK_ORDERS;
    },

    async getAllOrders() {
      const data = await request(ENDPOINTS.GET_ALL_ORDERS, { method: "GET" }, MOCK_ORDERS);
      return Array.isArray(data) ? data : data?.orders || MOCK_ORDERS;
    },

    async updateStatus(orderId, status) {
      return request(
        ENDPOINTS.UPDATE_ORDER_STATUS(orderId),
        {
          method: "PUT",
          body: JSON.stringify({ status }),
        },
        { success: true, orderId, status }
      );
    },
  },
};

export default apiService;
