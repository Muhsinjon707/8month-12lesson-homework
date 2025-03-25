import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  emailVerified?: boolean; 
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  authReady: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  authReady: false
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<any>) => {
      const { uid, email, displayName, photoURL, emailVerified } =
        action.payload;

      state.user = { uid, email, displayName, photoURL, emailVerified };
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthReady: (state) => {
      state.authReady = true;
    }
  },
});

export default loginSlice.reducer;
export const { loginUser, logoutUser, setUser, setAuthError, setLoading, setAuthReady } =
  loginSlice.actions;
