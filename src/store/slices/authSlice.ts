import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, RiderUser, DriverUser, isDriver, isRider } from "@/lib/api";
import type { RootState } from "@/store";

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
        role: "rider" | "driver";
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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

// ─── Base selectors ───────────────────────────────────────────────────────────

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRole = (state: RootState) => state.auth.role;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// ─── Narrowed selectors ───────────────────────────────────────────────────────

export const selectRiderUser = (state: RootState): RiderUser | null => {
  const user = state.auth.user;
  return user && isRider(user) ? user : null;
};

export const selectDriverUser = (state: RootState): DriverUser | null => {
  const user = state.auth.user;
  return user && isDriver(user) ? user : null;
};

// ─── Rider-specific derived selectors ────────────────────────────────────────

export const selectRiderFullName = (state: RootState): string => {
  const user = state.auth.user;
  return user && isRider(user) ? user.fullName : "";
};

export const selectRiderEmail = (state: RootState): string => {
  const user = state.auth.user;
  return user && isRider(user) ? user.email : "";
};

export const selectRiderPhone = (state: RootState): string => {
  const user = state.auth.user;
  return user && isRider(user) ? user.phone : "";
};

export const selectRiderIsVerified = (state: RootState): boolean => {
  const user = state.auth.user;
  return user && isRider(user) ? user.isVerified : false;
};

export const selectRiderEmergencyContact = (state: RootState) => {
  const user = state.auth.user;
  return user && isRider(user) ? user.emergencyContact : null;
};

export const selectRiderInitials = (state: RootState): string => {
  const user = state.auth.user;
  if (!user || !isRider(user)) return "RD";
  return user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// ─── Driver-specific derived selectors ───────────────────────────────────────

export const selectDriverName = (state: RootState): string => {
  const user = state.auth.user;
  if (!user || !isDriver(user)) return "";
  return `${user.personalInfo.firstName} ${user.personalInfo.lastName}`;
};

export const selectDriverApprovalStatus = (state: RootState) => {
  const user = state.auth.user;
  return user && isDriver(user) ? user.approvalStatus : null;
};

export const selectDriverInitials = (state: RootState): string => {
  const user = state.auth.user;
  if (!user || !isDriver(user)) return "DR";
  return `${user.personalInfo.firstName[0]}${user.personalInfo.lastName[0]}`.toUpperCase();
};

export default authSlice.reducer;
