import { configureStore } from "@reduxjs/toolkit";

// slices
import likedReducer from "./slice/favoritesSlice"
import collectionsReducer from "./slice/collectionsSlice"
import modalReducer from "./slice/modalSlice"

export const store = () => {
  return configureStore({
    reducer: {
      "liked": likedReducer,
      "collections": collectionsReducer,
      "modal": modalReducer
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
