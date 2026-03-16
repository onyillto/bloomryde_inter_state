import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ─── Types ────────────────────────────────────────────────────────────────────
// TODO: Move these to a shared types file (e.g. src/types/trip.ts) when endpoints are ready

export type TripStatus = "pending" | "active" | "completed" | "cancelled";

export interface TripLocation {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Trip {
  id: string;
  origin: TripLocation;
  destination: TripLocation;
  status: TripStatus;
  fare?: number;
  distance?: number; // in km
  duration?: number; // in minutes
  scheduledAt?: string; // ISO date string
  completedAt?: string; // ISO date string
  driverId?: string;
  riderId?: string;
  paymentMethod?: "cash" | "wallet" | "card";
}

// ─── State ────────────────────────────────────────────────────────────────────

interface TripState {
  currentTrip: Trip | null;
  tripHistory: Trip[];
  selectedTrip: Trip | null; // for viewing details of a past trip
  isLoading: boolean;
  error: string | null;
}

const initialState: TripState = {
  currentTrip: null,
  tripHistory: [],
  selectedTrip: null,
  isLoading: false,
  error: null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    // Called when a new trip is booked / returned from API
    setCurrentTrip: (state, action: PayloadAction<Trip>) => {
      state.currentTrip = action.payload;
      state.error = null;
    },

    // Update specific fields on the current trip (e.g. status change via socket)
    updateCurrentTrip: (state, action: PayloadAction<Partial<Trip>>) => {
      if (state.currentTrip) {
        state.currentTrip = { ...state.currentTrip, ...action.payload };
      }
    },

    // Clear active trip (after completion or cancellation)
    clearCurrentTrip: (state) => {
      state.currentTrip = null;
    },

    // Load trip history from API
    setTripHistory: (state, action: PayloadAction<Trip[]>) => {
      state.tripHistory = action.payload;
    },

    // Prepend a newly completed trip to history
    appendTrip: (state, action: PayloadAction<Trip>) => {
      state.tripHistory.unshift(action.payload);
    },

    // Set the trip being viewed in detail (e.g. modal or detail page)
    setSelectedTrip: (state, action: PayloadAction<Trip | null>) => {
      state.selectedTrip = action.payload;
    },

    // Loading & error states — call these manually until RTK Query is wired up
    setTripLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTripError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Full reset — useful on logout
    resetTripState: () => initialState,
  },
});

export const {
  setCurrentTrip,
  updateCurrentTrip,
  clearCurrentTrip,
  setTripHistory,
  appendTrip,
  setSelectedTrip,
  setTripLoading,
  setTripError,
  resetTripState,
} = tripSlice.actions;

export default tripSlice.reducer;
