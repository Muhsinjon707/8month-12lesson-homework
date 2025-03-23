import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UnsplashPhoto } from "@/app/model/UnspashPhoto";

interface ModalState {
  imageModal: {
    isOpen: boolean;
    imageData?: UnsplashPhoto | null;
  };
  collectionModal: {
    isOpen: boolean;
    imageData?: UnsplashPhoto | null;
  };
}
const initialState: ModalState = {
  imageModal: {
    isOpen: false,
    imageData: null
  },
  collectionModal: {
    isOpen: false,
    imageData: null
  },
};

const firstModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Open the Image Modal
    openImageModal: (state, action: PayloadAction<UnsplashPhoto>) => {
      state.imageModal.isOpen = true;
      state.imageModal.imageData = action.payload;
    },

    // Close the Image Modal
    closeImageModal: (state) => {
      state.imageModal.isOpen = false;
      state.imageModal.imageData = null;
    },

    // Open the Collection Modal
    openCollectionModal: (state, action: PayloadAction<UnsplashPhoto>) => {
      state.collectionModal.isOpen = true;
      state.collectionModal.imageData = action.payload;
    },
    
    // Close the Colelction Modal
    closeCollectionModal: (state) => {
      state.collectionModal.isOpen = false;
      state.collectionModal.imageData = null;
    }
  },
});

// export the Modal slice
export default firstModalSlice.reducer;

// export Modal actions
export const {openImageModal, closeImageModal, openCollectionModal, closeCollectionModal} = firstModalSlice.actions;