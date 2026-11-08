import { createSlice } from "@reduxjs/toolkit";
import { MOCK_PRODUCTS } from "../../constants/mockData";

const initialState = {
  products: MOCK_PRODUCTS,
  selectedCategory: "All",
  searchQuery: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    }
  }
});

export const { setCategory, setSearchQuery, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
