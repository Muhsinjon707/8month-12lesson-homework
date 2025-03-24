import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UnsplashPhoto } from "@/app/model/UnspashPhoto";

// Adding localStorage data
const loadDownloads = (): UnsplashPhoto[] => {
  if (typeof window !== "undefined") {
    const storedDownloads = localStorage.getItem("downloads");
    return storedDownloads ? JSON.parse(storedDownloads) : [];
  }
  return [];
};

interface DownloadsState {
  downloadsList: UnsplashPhoto[];
}

const initialState: DownloadsState = {
  downloadsList: loadDownloads(),
};

const saveToLocalStorage = (downloads: UnsplashPhoto[]) => {
  localStorage.setItem("downloads", JSON.stringify(downloads));
};

const downloadSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {
    addToDownloads: (state, action: PayloadAction<UnsplashPhoto>) => {
      const exists = state.downloadsList.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.downloadsList = [...state.downloadsList, action.payload];
        saveToLocalStorage(state.downloadsList);
      }
    },
    removeFromDownloads: (state, action: PayloadAction<string>) => {
      state.downloadsList = state.downloadsList.filter(
        (item) => item.id !== action.payload
      );
      saveToLocalStorage(state.downloadsList);
    },
  },
});

export default downloadSlice.reducer;
export const { addToDownloads, removeFromDownloads } = downloadSlice.actions;
