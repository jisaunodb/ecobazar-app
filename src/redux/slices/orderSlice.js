import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../services/orderService";
import { MOCK_ORDERS } from "../../constants/mockData";
const initialState = {
  allOrders: MOCK_ORDERS,
  userOrders: MOCK_ORDERS,
  currentOrder: null,
  isLoading: false,
  error: null
};
export const fetchMyOrders = createAsyncThunk("orders/fetchMyOrders", async () => {
  const response = await orderService.getUserOrders("usr_cust_1");
  return response.orders || MOCK_ORDERS;
});
export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async () => {
  const response = await orderService.getAllOrders();
  return response.orders || MOCK_ORDERS;
});
export const fetchSingleOrder = createAsyncThunk("orders/fetchSingleOrder", async (id) => {
  const response = await orderService.getOrderById(id);
  return response.order;
});
export const createNewOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
    const response = await orderService.createOrder(orderData);
    return response;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }) => {
    const response = await orderService.updateOrderStatus(orderId, status);
    return { orderId, status, order: response.order };
  }
);
export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyOrders.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userOrders = action.payload;
    }).addCase(fetchAllOrders.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allOrders = action.payload;
    }).addCase(fetchSingleOrder.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchSingleOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload || null;
    }).addCase(createNewOrder.fulfilled, (state, action) => {
      if (action.payload.order) {
        state.userOrders.unshift(action.payload.order);
        state.allOrders.unshift(action.payload.order);
        state.currentOrder = action.payload.order;
      }
    }).addCase(updateOrderStatus.fulfilled, (state, action) => {
      const { orderId, status } = action.payload;
      const targetAll = state.allOrders.find((o) => o._id === orderId);
      if (targetAll) targetAll.orderStatus = status;
      const targetUser = state.userOrders.find((o) => o._id === orderId);
      if (targetUser) targetUser.orderStatus = status;
      if (state.currentOrder && state.currentOrder._id === orderId) {
        state.currentOrder.orderStatus = status;
      }
    });
  }
});
export const { setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
