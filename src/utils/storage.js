export const STORAGE_KEYS = {
  TOKEN: "ecobazar_token",
  USER: "ecobazar_user",
  CART: "ecobazar_cart",
  WISHLIST: "ecobazar_wishlist",
  THEME: "ecobazar_dark_mode"
};
export const getStorageItem = (key, fallbackValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallbackValue;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return fallbackValue;
  }
};
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting key "${key}" to localStorage:`, error);
  }
};
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
};
