import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  darkMode: null as string | null
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<string>) => {
      state.darkMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", action.payload);
      }
    },
    toggleDarkMode: (state) => {
      const newMode = state.darkMode === "light" ? "dark" : "light";
      state.darkMode = newMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", newMode);
      }
    },
    hydrateDarkMode: (state) => {
      if (typeof window !== "undefined") {
        state.darkMode = localStorage.getItem("darkMode") || "light";
      }
    },
  },
});

export default darkModeSlice.reducer;
export const { toggleDarkMode, setDarkMode, hydrateDarkMode } = darkModeSlice.actions;
