// =============================================================================
// 🌐 BACKEND API CONFIGURATION
// 👉 এখানে আপনার ব্যাকএন্ডের API URL টি বসিয়ে দিন (Replace with your backend URL)
// =============================================================================

// উদাহরণ:
// - লোকালহোস্ট টেস্ট করার জন্য (আপনার কম্পিউটারের Wi-Fi IP ব্যবহার করুন, যেমন http://192.168.0.105:5000/api)
// - লাইভ সার্ভারের জন্য (যেমন https://api.yourdomain.com/api)
export const API_BASE_URL = "https://ecobazar-backend-1qs6.onrender.com";

// API Endpoints Mapping
export const ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  GET_PROFILE: "/auth/profile",

  // Products
  GET_PRODUCTS: "/products",
  GET_CATEGORIES: "/categories",
  GET_PRODUCT_DETAILS: (id) => `/products/${id}`,
  CREATE_PRODUCT: "/products",
  DELETE_PRODUCT: (id) => `/products/${id}`,

  // Orders
  CREATE_ORDER: "/orders",
  GET_MY_ORDERS: "/orders/my-orders",
  GET_ALL_ORDERS: "/orders", // For Admin
  UPDATE_ORDER_STATUS: (id) => `/orders/${id}/status`,
};

// টোকেন বা হেডার কনফিগারেশন
export const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};
