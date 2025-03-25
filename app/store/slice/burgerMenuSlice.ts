import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const BurgerModalSlice = createSlice({
  name: "burgerMenu",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openWindow: (state) => {
      state.isOpen = true;
    },
    closeWindow: (state) => {
      state.isOpen = false;
    },
  },
});

export default BurgerModalSlice.reducer;
export const {openWindow, closeWindow} = BurgerModalSlice.actions;