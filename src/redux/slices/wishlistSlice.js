import { createSlice } from "@reduxjs/toolkit";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "../../utils/storage";
const storedWishlist = getStorageItem(STORAGE_KEYS.WISHLIST, []);
const initialState = {
  items: storedWishlist
};
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((p) => p._id === product._id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      setStorageItem(STORAGE_KEYS.WISHLIST, state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      setStorageItem(STORAGE_KEYS.WISHLIST, []);
    }
  }
});
export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
