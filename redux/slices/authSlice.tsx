import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: { email: string; password: string } | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem("user");
    },

    loadUserFromStorage: (
      state,
      action: PayloadAction<{ email: string; password: string } | null>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
});

export const { login, logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
