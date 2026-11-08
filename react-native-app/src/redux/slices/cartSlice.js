import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      _id: "prod_1",
      name: "Fresh Organic Hass Avocados (Pack of 3)",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
      quantity: 2,
      stock: 25
    },
    {
      _id: "prod_2",
      name: "Pure Cold-Pressed Extra Virgin Olive Oil 500ml",
      price: 14.50,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
      quantity: 1,
      stock: 14
    }
  ],
  coupon: null,
  discountAmount: 0,
  shippingFee: 2.99
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
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
    },
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();
      if (code === "SAVE10" || code === "ECO10") {
        state.coupon = code;
        state.discountAmount = 5.00;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.discountAmount = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, applyCoupon, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
