import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UnsplashPhoto } from "@/app/model/UnspashPhoto";

const loadFavorites = (): UnsplashPhoto[] => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

interface FavoritesState {
  likedImages: UnsplashPhoto[];
}

const initialState: FavoritesState = {
  likedImages: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Add to favorites only if it doesn't exist
    addToFavorites: (state, action: PayloadAction<UnsplashPhoto>) => {
      const exists = state.likedImages.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.likedImages.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.likedImages));
      }
    },

    // Remove from favorites by ID
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.likedImages = state.likedImages.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.likedImages));
    },

    // Clear all favorites
    clearAllFavorites: (state) => {
      state.likedImages = [];
      localStorage.removeItem("favorites");
    },
  },
});

export default favoritesSlice.reducer;
export const { addToFavorites, removeFromFavorites, clearAllFavorites } =
  favoritesSlice.actions;
