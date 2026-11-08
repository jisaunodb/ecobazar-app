import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "../../constants/mockData";
const initialState = {
  products: INITIAL_PRODUCTS,
  categories: INITIAL_CATEGORIES,
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    category: "",
    search: "",
    sort: "newest",
    minPrice: 0,
    maxPrice: 500,
    rating: 0
  }
};
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params) => {
    const response = await productService.getAllProducts(params);
    return response.products;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (id) => {
    const response = await productService.getSingleProduct(id);
    return response.product;
  }
);
export const createProductThunk = createAsyncThunk(
  "products/create",
  async (productData) => {
    const response = await productService.createProduct(productData);
    return response;
  }
);
export const createNewProduct = createProductThunk;
export const updateProductThunk = createAsyncThunk(
  "products/update",
  async ({ id, data }) => {
    const response = await productService.updateProduct(id, data);
    return { id, data, message: response.message };
  }
);
export const updateExistingProduct = createAsyncThunk(
  "products/updateExisting",
  async (productData, { dispatch }) => {
    if (!productData._id) return;
    const result = await dispatch(updateProductThunk({ id: productData._id, data: productData }));
    return result;
  }
);
export const deleteProductThunk = createAsyncThunk(
  "products/delete",
  async (id) => {
    const response = await productService.deleteProduct(id);
    return { id, message: response.message };
  }
);
export const deleteExistingProduct = deleteProductThunk;
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        category: "",
        search: "",
        sort: "newest",
        minPrice: 0,
        maxPrice: 500,
        rating: 0
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    }).addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch products";
    }).addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
    }).addCase(createProductThunk.fulfilled, (state, action) => {
      if (action.payload.product) {
        state.products.unshift(action.payload.product);
      }
    }).addCase(updateProductThunk.fulfilled, (state, action) => {
      const index = state.products.findIndex((p) => p._id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload.data };
      }
    }).addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload.id);
    });
  }
});
export const { setFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;
