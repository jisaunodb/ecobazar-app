import { createSlice } from "@reduxjs/toolkit";
import { MOCK_USER_CUSTOMER, MOCK_USER_ADMIN } from "../../constants/mockData";

const initialState = {
  user: MOCK_USER_CUSTOMER,
  isAuthenticated: true,
  role: "user",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAsCustomer: (state) => {
      state.user = MOCK_USER_CUSTOMER;
      state.isAuthenticated = true;
      state.role = "user";
    },
    loginAsAdmin: (state) => {
      state.user = MOCK_USER_ADMIN;
      state.isAuthenticated = true;
      state.role = "admin";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = "guest";
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  }
});

export const { loginAsCustomer, loginAsAdmin, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
