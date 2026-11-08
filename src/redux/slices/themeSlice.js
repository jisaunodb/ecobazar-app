import { createSlice } from "@reduxjs/toolkit";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "../../utils/storage";
const storedDarkMode = getStorageItem(STORAGE_KEYS.THEME, false);
const initialState = {
  darkMode: storedDarkMode
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      setStorageItem(STORAGE_KEYS.THEME, state.darkMode);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      setStorageItem(STORAGE_KEYS.THEME, state.darkMode);
    }
  }
});
export const { toggleTheme, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
