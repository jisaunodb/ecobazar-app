import { createSlice } from "@reduxjs/toolkit";
import { MOCK_ORDERS } from "../../constants/mockData";

const initialState = {
  orders: MOCK_ORDERS
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o._id === id);
      if (order) {
        order.status = status;
      }
    }
  }
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
