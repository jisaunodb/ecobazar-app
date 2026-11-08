import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: ["prod_1", "prod_3"]
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((item) => item !== id);
      } else {
        state.items.push(id);
      }
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
