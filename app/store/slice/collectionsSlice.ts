import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UnsplashPhoto } from "@/app/model/UnspashPhoto";

// Collection interface
import { Collection, CollectionState } from "@/app/model/CollectionPhoto";

// Adding localStorage data
const loadCollections = (): Collection[] => {
  if (typeof window !== "undefined") {
    const storedCollections = localStorage.getItem("collections");
    return storedCollections ? JSON.parse(storedCollections) : [];
  }
  return [];
};

const initialState: CollectionState = {
  collections: loadCollections(),
};

const saveToLocalStorage = (collections: Collection[]) => {
  localStorage.setItem("collections", JSON.stringify(collections));
};

const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    // Create a new collection
    createCollection: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        description: string;
        type: boolean;
        images: UnsplashPhoto[];
      }>
    ) => {
      const newCollection: Collection = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        type: action.payload.type ? "private" : "public",
        images: [...action.payload.images],
      };

      state.collections.push(newCollection);
      saveToLocalStorage(state.collections);
    },

    // Remove a collection
    deleteCollection: (state, action: PayloadAction<string>) => {
      state.collections = state.collections.filter(
        (item) => item.id !== action.payload
      );
      saveToLocalStorage(state.collections);
    },

    // Add a new image to a collection (Fix: Pass UnsplashPhoto instead of string ID)
    addImageToCollection: (
      state,
      action: PayloadAction<{ collectionId: string; image: UnsplashPhoto }>
    ) => {
      const { collectionId, image } = action.payload;
      const collection = state.collections.find((c) => c.id === collectionId);
      if (collection && !collection.images.some((img) => img.id === image.id)) {
        collection.images.push(image);
        saveToLocalStorage(state.collections);
      }
    },

    // Remove an image from a collection (Fix: Use image.id for filtering)
    removeImageFromCollection: (
      state,
      action: PayloadAction<{ collectionId: string; imageId: string }>
    ) => {
      const { collectionId, imageId } = action.payload;
      const collection = state.collections.find((c) => c.id === collectionId);
      if (collection) {
        collection.images = collection.images.filter(
          (img) => img.id !== imageId
        );
        saveToLocalStorage(state.collections);
      }
    },

    // Clear out all the collections
    clearAllCollections: (state) => {
      state.collections = [];
      localStorage.removeItem("collections");
    },
  },
});

// Collection Slice exports
export default collectionSlice.reducer;
export const {
  createCollection,
  deleteCollection,
  addImageToCollection,
  removeImageFromCollection,
  clearAllCollections,
} = collectionSlice.actions;
