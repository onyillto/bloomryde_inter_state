import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isLoading: boolean;
  modals: {
    confirmLogout: boolean;
    editProfile: boolean;
    tripDetails: boolean;
  };
  toast: {
    message: string;
    type: "success" | "error" | "info" | null;
  } | null;
}

const initialState: UIState = {
  isLoading: false,
  modals: {
    confirmLogout: false,
    editProfile: false,
    tripDetails: false,
  },
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    openModal: (state, action: PayloadAction<keyof UIState["modals"]>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof UIState["modals"]>) => {
      state.modals[action.payload] = false;
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>
    ) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const {
  setGlobalLoading,
  openModal,
  closeModal,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
