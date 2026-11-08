import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { MOCK_USER_CUSTOMER, MOCK_USER_ADMIN } from "../../constants/mockData";
const mockUsers = [
  MOCK_USER_ADMIN,
  MOCK_USER_CUSTOMER,
  {
    _id: "usr_cust_2",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "user",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    isVerified: true,
    isActive: true,
    createdAt: "2026-04-18"
  },
  {
    _id: "usr_vendor_1",
    name: "Green Valley Farms",
    email: "vendor@greenvalley.com",
    role: "vendor",
    phone: "+1 (555) 888-9900",
    avatar: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80",
    isVerified: true,
    isActive: true,
    createdAt: "2026-02-10"
  }
];
const initialState = {
  users: mockUsers,
  usersList: mockUsers,
  selectedUser: null,
  isLoading: false,
  error: null
};
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  const response = await userService.getAllUsers();
  return response.users || mockUsers;
});
export const fetchUsersList = fetchAllUsers;
export const deleteUserThunk = createAsyncThunk("users/delete", async (id) => {
  const response = await userService.deleteUser(id);
  return { id, message: response.message };
});
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.usersList = action.payload;
    }).addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload.id);
      state.usersList = state.usersList.filter((u) => u._id !== action.payload.id);
    });
  }
});
export default userSlice.reducer;
