import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, RiderUser, DriverUser, isDriver, isRider } from "@/lib/api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  role: "rider" | "driver" | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        role: "rider" | "driver"; // still accepted explicitly for clarity
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Prefer role from the user object itself — single source of truth
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // Keep role in sync if user object is replaced
      state.role = action.payload.role;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.role = null;
    },
  },
});

export const {
  setCredentials,
  updateUser,
  setAuthLoading,
  setAuthError,
  logout,
} = authSlice.actions;

// ─────────────────────────────────────────────────────────────
//  SELECTORS — use these in components instead of raw state access
// ─────────────────────────────────────────────────────────────

import type { RootState } from "@/store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRole = (state: RootState) => state.auth.role;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Narrowed selectors — return typed user or null
export const selectRiderUser = (state: RootState): RiderUser | null => {
  const user = state.auth.user;
  return user && isRider(user) ? user : null;
};

export const selectDriverUser = (state: RootState): DriverUser | null => {
  const user = state.auth.user;
  return user && isDriver(user) ? user : null;
};

export default authSlice.reducer;
