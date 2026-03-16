import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tripReducer, { resetTripState } from "./slices/tripSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
