import { createSlice } from "@reduxjs/toolkit";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "../../utils/storage";
const storedCart = getStorageItem(STORAGE_KEYS.CART, []);
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return acc + price * item.quantity;
  }, 0);
  return { totalQuantity, totalPrice };
};
const initialTotals = calculateTotals(storedCart);
const initialState = {
  items: storedCart,
  totalQuantity: initialTotals.totalQuantity,
  totalPrice: initialTotals.totalPrice
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((i) => i.product._id === product._id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          _id: `cart_item_${Date.now()}`,
          product,
          quantity
        });
      }
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      setStorageItem(STORAGE_KEYS.CART, state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      setStorageItem(STORAGE_KEYS.CART, state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      setStorageItem(STORAGE_KEYS.CART, state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      setStorageItem(STORAGE_KEYS.CART, []);
    }
  }
});
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
