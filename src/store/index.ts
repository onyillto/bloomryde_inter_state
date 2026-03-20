import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import authReducer from "./slices/authSlice";
import tripReducer from "./slices/tripSlice";
import uiReducer from "./slices/uiSlice";
import bookingReducer from "./slices/bookingSlice";

// ── Persist config ────────────────────────────────────────────
// auth persists fully — token + user survives refresh
// booking persists bookedTrips only — search results reset on refresh (intentional)
// trip persists tripHistory — driver trips survive refresh
// ui does NOT persist — modal/sidebar state always resets

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "role", "isAuthenticated"],
};

const bookingPersistConfig = {
  key: "booking",
  storage,
  whitelist: ["bookedTrips"], // search results intentionally NOT persisted
};

const tripPersistConfig = {
  key: "trip",
  storage,
  whitelist: ["tripHistory"], // driver trip history survives refresh
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  trip: persistReducer(tripPersistConfig, tripReducer),
  booking: persistReducer(bookingPersistConfig, bookingReducer),
  ui: uiReducer, // not persisted
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // required by redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
