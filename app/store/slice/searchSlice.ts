import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: ""
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    }
  }
})

// Export default reducer
export default searchSlice.reducer;

// Export slice actions
export const {setSearchQuery} = searchSlice.actions;
