import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { Trip, Booking } from "@/lib/api";

// ─── State ────────────────────────────────────────────────────────────────────

interface BookingState {
  // Search
  searchResults: Trip[];
  searchLoading: boolean;
  searchError: string | null;
  lastSearch: {
    origin: string;
    destination: string;
    departureDate: string;
    passengers: number;
  } | null;

  // Selected / active trip being viewed
  selectedTrip: Trip | null;

  // Booking flow
  contactedTrip: Trip | null;
  confirmedTrip: Trip | null;
  bookingLoading: boolean;
  bookingError: string | null;

  // Rider's booked trips — from GET /trips/booked-trips
  bookedTrips: Booking[];
  bookedTripsLoading: boolean;
}

const initialState: BookingState = {
  searchResults: [],
  searchLoading: false,
  searchError: null,
  lastSearch: null,
  selectedTrip: null,
  contactedTrip: null,
  confirmedTrip: null,
  bookingLoading: false,
  bookingError: null,
  bookedTrips: [],
  bookedTripsLoading: false,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // ── Search results ────────────────────────────────────
    setSearchResults: (state, action: PayloadAction<Trip[]>) => {
      state.searchResults = action.payload;
      state.searchError = null;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },
    setSearchError: (state, action: PayloadAction<string | null>) => {
      state.searchError = action.payload;
    },
    setLastSearch: (
      state,
      action: PayloadAction<BookingState["lastSearch"]>
    ) => {
      state.lastSearch = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
      state.lastSearch = null;
    },

    // ── Trip selection ────────────────────────────────────
    setSelectedTrip: (state, action: PayloadAction<Trip | null>) => {
      state.selectedTrip = action.payload;
    },

    // ── Booking flow ──────────────────────────────────────
    setContactedTrip: (state, action: PayloadAction<Trip | null>) => {
      state.contactedTrip = action.payload;
    },
    setConfirmedTrip: (state, action: PayloadAction<Trip | null>) => {
      state.confirmedTrip = action.payload;
    },
    setBookingLoading: (state, action: PayloadAction<boolean>) => {
      state.bookingLoading = action.payload;
    },
    setBookingError: (state, action: PayloadAction<string | null>) => {
      state.bookingError = action.payload;
    },

    // ── Rider's booked trips ──────────────────────────────
    setBookedTrips: (state, action: PayloadAction<Booking[]>) => {
      state.bookedTrips = action.payload;
    },
    setBookedTripsLoading: (state, action: PayloadAction<boolean>) => {
      state.bookedTripsLoading = action.payload;
    },

    // ── Reset booking flow (e.g. "Book Another Trip") ─────
    resetBookingFlow: (state) => {
      state.selectedTrip = null;
      state.contactedTrip = null;
      state.confirmedTrip = null;
      state.bookingError = null;
    },

    // ── Full reset on logout ──────────────────────────────
    resetBookingState: () => initialState,
  },
});

export const {
  setSearchResults,
  setSearchLoading,
  setSearchError,
  setLastSearch,
  clearSearchResults,
  setSelectedTrip,
  setContactedTrip,
  setConfirmedTrip,
  setBookingLoading,
  setBookingError,
  setBookedTrips,
  setBookedTripsLoading,
  resetBookingFlow,
  resetBookingState,
} = bookingSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectSearchResults = (state: RootState) =>
  state.booking.searchResults;
export const selectSearchLoading = (state: RootState) =>
  state.booking.searchLoading;
export const selectSearchError = (state: RootState) =>
  state.booking.searchError;
export const selectLastSearch = (state: RootState) => state.booking.lastSearch;
export const selectSelectedTrip = (state: RootState) =>
  state.booking.selectedTrip;
export const selectContactedTrip = (state: RootState) =>
  state.booking.contactedTrip;
export const selectConfirmedTrip = (state: RootState) =>
  state.booking.confirmedTrip;
export const selectBookingLoading = (state: RootState) =>
  state.booking.bookingLoading;
export const selectBookingError = (state: RootState) =>
  state.booking.bookingError;

// Rider booked trips
export const selectBookedTrips = (state: RootState) =>
  state.booking.bookedTrips;
export const selectBookedTripsLoading = (state: RootState) =>
  state.booking.bookedTripsLoading;

// Derived
export const selectSearchResultCount = (state: RootState) =>
  state.booking.searchResults.length;
export const selectAvailableTrips = (state: RootState) =>
  state.booking.searchResults.filter((t) => t.availableSeats > 0);
export const selectScheduledTrips = (state: RootState) =>
  state.booking.searchResults.filter((t) => t.status === "scheduled");

export default bookingSlice.reducer;
