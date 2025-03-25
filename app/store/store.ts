import { configureStore } from "@reduxjs/toolkit";

// slices
import likedReducer from "./slice/favoritesSlice";
import collectionsReducer from "./slice/collectionsSlice";
import modalReducer from "./slice/modalSlice";
import searchReducer from "./slice/searchSlice";
import downloadsReducer from "./slice/downloadsSlice";
import darkModeReducer from "./slice/darkModeSlice";
import loginReducer from "./slice/loginSlice";
import burgerMenuReducer from "./slice/burgerMenuSlice";

export const store = () => {
  return configureStore({
    reducer: {
      liked: likedReducer,
      collections: collectionsReducer,
      modal: modalReducer,
      search: searchReducer,
      downloads: downloadsReducer,
      darkMode: darkModeReducer,
      login: loginReducer,
      burgerMenu: burgerMenuReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
