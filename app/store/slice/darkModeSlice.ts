import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("darkMode") || "false");
  }
  return false;
};

const initialState = {
  darkMode: getInitialDarkMode(),
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    setDarkMode: (state) => {
      state.darkMode = true;
      localStorage.setItem("darkMode", "true");
    },
    setLightMode: (state) => {
      state.darkMode = false;
      localStorage.setItem("darkMode", "false");
    },
  },
});

export default darkModeSlice.reducer;
export const { toggleDarkMode, setDarkMode, setLightMode } = darkModeSlice.actions;
