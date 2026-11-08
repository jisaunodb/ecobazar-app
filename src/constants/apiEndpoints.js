export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email"
  },
  PRODUCTS: {
    BASE: "/products",
    CATEGORIES: "/products/categories",
    FEATURED: "/products/featured",
    NEW_ARRIVALS: "/products/new-arrivals",
    SEARCH: "/products/search"
  },
  CART: {
    BASE: "/cart",
    ADD: "/cart/add",
    UPDATE: "/cart/update",
    REMOVE: "/cart/remove",
    CLEAR: "/cart/clear"
  },
  ORDERS: {
    BASE: "/orders",
    MY_ORDERS: "/orders/my-orders",
    CREATE: "/orders/create",
    STATUS: "/orders/status"
  },
  USER: {
    PROFILE: "/user/profile",
    ADDRESSES: "/user/addresses",
    PASSWORD: "/user/change-password"
  },
  ADMIN: {
    ANALYTICS: "/admin/analytics",
    USERS: "/admin/users"
  }
};
