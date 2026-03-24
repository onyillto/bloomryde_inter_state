const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };
  const response = await fetch(url, config);
  return handleResponse(response);
}

// ─────────────────────────────────────────────────────────────
//  RIDER USER TYPE
// ─────────────────────────────────────────────────────────────

export interface RiderUser {
  _id: string;
  phone: string;
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  profilePhoto?: string;
  role: "rider";
  isVerified: boolean;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

// ─────────────────────────────────────────────────────────────
//  DRIVER USER TYPE
// ─────────────────────────────────────────────────────────────

export interface DriverUser {
  _id: string;
  role: "driver";
  approvalStatus: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
  };
  verificationDocuments: {
    driversLicense: {
      front: string;
      back: string;
      number: string;
      expiryDate: string;
    };
    nationalId: {
      number: string;
      document: string;
    };
    verificationSelfie: string;
  };
  contacts: {
    emergency: {
      fullName: string;
      phoneNumber: string;
      relationship: string;
    };
    guarantor: {
      fullName: string;
      phoneNumber: string;
      address: string;
      relationshipAndOccupation: string;
    };
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
    plateNumber: string;
    passengerSeats: number;
    vin: string;
    photos: Array<{
      label: string;
      file: string;
      _id: string;
    }>;
    documents: {
      registrationCertificate: string;
      insuranceCertificate: string;
      roadWorthiness: string;
    };
  };
}

// ─────────────────────────────────────────────────────────────
//  UNION TYPE
// ─────────────────────────────────────────────────────────────

export type User = RiderUser | DriverUser;

// ─────────────────────────────────────────────────────────────
//  TYPE GUARDS
// ─────────────────────────────────────────────────────────────

export const isRider = (user: User): user is RiderUser => user.role === "rider";
export const isDriver = (user: User): user is DriverUser =>
  user.role === "driver";

// ─────────────────────────────────────────────────────────────
//  DISPLAY HELPERS
// ─────────────────────────────────────────────────────────────

export const getUserDisplayName = (user: User): string => {
  if (isDriver(user)) {
    const { firstName, lastName } = user.personalInfo;
    return `${firstName} ${lastName}`;
  }
  return user.fullName;
};

export const getUserEmail = (user: User): string => {
  if (isDriver(user)) return user.personalInfo.email;
  return user.email;
};

export const getUserPhone = (user: User): string => {
  if (isDriver(user)) return user.personalInfo.phoneNumber;
  return user.phone;
};

// ─────────────────────────────────────────────────────────────
//  AUTH ENDPOINTS
// ─────────────────────────────────────────────────────────────

export const requestOTP = (phoneNumber: string) =>
  apiRequest("/users/request-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });

export const verifyOTP = (phoneNumber: string, otp: string) =>
  apiRequest("/users/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber, otp }),
  });

export const loginRider = (credentials: { email: string; password: string }) =>
  apiRequest("/users/login-rider", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const loginDriver = (credentials: { email: string; password: string }) =>
  apiRequest("/users/login-driver", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const getUserProfile = (token: string) =>
  apiRequest("/users/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

// ─────────────────────────────────────────────────────────────
//  RIDER PROFILE UPDATE — PATCH /users/profile/rider
// ─────────────────────────────────────────────────────────────

export interface UpdateRiderProfilePayload {
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  profilePhoto?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export const updateRiderProfile = async (
  payload: UpdateRiderProfilePayload,
  token: string
): Promise<{ status: string; data: { rider: RiderUser } }> => {
  const response = await fetch(`${API_BASE_URL}/users/profile/rider`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────
//  RIDER REGISTRATION — POST /users/register-rider
// ─────────────────────────────────────────────────────────────

export interface RegisterRiderPayload {
  phone: string;
  email: string;
  password: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export const registerRider = async (
  payload: RegisterRiderPayload
): Promise<{ status: string; token: string; data: { rider: RiderUser } }> => {
  const response = await fetch(`${API_BASE_URL}/users/register-rider`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));

    console.error("registerRider error:", errData);
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────
//  TRIP TYPES
// ─────────────────────────────────────────────────────────────

export type TripStatus = "scheduled" | "active" | "completed" | "cancelled";
export type LuggagePolicy = "none" | "light" | "medium" | "heavy";

export interface TripLocation {
  address: string;
  city: string;
  state: string;
  coordinates: [number, number];
  _id?: string;
}

export interface TripStopInput {
  address: string;
  city: string;
  state: string;
  coordinates?: [number, number];
}

export interface TripPreferences {
  smokingAllowed: boolean;
  petsAllowed: boolean;
  luggagePolicy: LuggagePolicy;
  instantBooking: boolean;
}

export interface TripVehicle {
  make: string;
  model: string;
  year: string;
  color: string;
  plateNumber: string;
}

export interface Trip {
  _id: string;
  id: string;
  driver: string;
  vehicle: TripVehicle | string;
  origin: TripLocation;
  destination: TripLocation;
  stops: TripLocation[];
  departureTime: string;
  pricePerSeat: number;
  totalSeats: number;
  availableSeats: number;
  status: TripStatus;
  description?: string;
  preferences: TripPreferences;
  bookings: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripPayload {
  originAddress: string;
  destinationAddress: string;
  departureTime: string;
  pricePerSeat: number;
  totalSeats: number;
  stops?: TripStopInput[];
  preferences: TripPreferences;
  description?: string;
}

// ─────────────────────────────────────────────────────────────
//  TRIP ENDPOINTS
// ─────────────────────────────────────────────────────────────

export const createTrip = async (
  payload: CreateTripPayload,
  token: string
): Promise<Trip> => {
  const response = await fetch(`${API_BASE_URL}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  const data = await response.json();
  return data.data.trip;
};

export const getMyTrips = async (
  token: string
): Promise<{ status: string; results: number; data: { trips: Trip[] } }> => {
  const response = await fetch(`${API_BASE_URL}/trips/my-trips`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

export const getTripById = (tripId: string, token: string) =>
  apiRequest(`/trips/${tripId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

export const cancelTrip = (tripId: string, token: string) =>
  apiRequest(`/trips/${tripId}/cancel`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

// ─────────────────────────────────────────────────────────────
//  PUBLIC TRIP SEARCH (for riders)
// ─────────────────────────────────────────────────────────────

export interface TripSearchParams {
  origin?: string;
  destination?: string;
  date?: string;
  seats?: number;
}

export const getAvailableTrips = async (
  token: string
): Promise<{ status: string; results: number; data: { trips: Trip[] } }> => {
  const response = await fetch(`${API_BASE_URL}/trips`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────
//  TRIP SEARCH (for riders) — POST /trips/search
// ─────────────────────────────────────────────────────────────

export interface TripSearchPayload {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: number;
}

export const searchTrips = async (
  payload: TripSearchPayload,
  token: string
): Promise<{ status: string; results: number; data: { trips: Trip[] } }> => {
  const response = await fetch(`${API_BASE_URL}/trips/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────
//  BOOKING TYPES
// ─────────────────────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface BookingDriver {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
    plateNumber: string;
    passengerSeats: number;
    vin: string;
    photos: Array<{
      label: string;
      file: string;
      _id: string;
    }>;
    documents: {
      registrationCertificate: string;
      insuranceCertificate: string;
      roadWorthiness: string;
    };
  };
}

export interface BookingTrip {
  _id: string;
  id: string;
  driver: BookingDriver;
  vehicle: TripVehicle;
  origin: TripLocation;
  destination: TripLocation;
  stops: TripLocation[];
  departureTime: string;
  pricePerSeat: number;
  totalSeats: number;
  availableSeats: number;
  status: TripStatus;
  description?: string;
  preferences: TripPreferences;
  bookings: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  id: string;
  trip: BookingTrip;
  rider: string;
  seatsBooked: number;
  totalPrice: number;
  status: BookingStatus;
  paymentInfo: {
    paymentStatus: PaymentStatus;
  };
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────
//  BOOKING ENDPOINTS
// ─────────────────────────────────────────────────────────────

export const getBookedTrips = async (
  token: string
): Promise<{
  status: string;
  results: number;
  data: { bookings: Booking[] };
}> => {
  const response = await fetch(`${API_BASE_URL}/trips/booked-trips`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────
//  BOOK A TRIP (for riders)
// ─────────────────────────────────────────────────────────────

export interface BookTripPayload {
  tripId: string;
  seats: number;
}

export interface BookTripResponse {
  _id: string;
  id: string;
  trip: string;
  rider: string;
  seatsBooked: number;
  totalPrice: number;
  status: BookingStatus;
  paymentInfo: {
    paymentStatus: PaymentStatus;
  };
  createdAt: string;
  updatedAt: string;
}

export const bookTrip = async (
  payload: BookTripPayload,
  token: string
): Promise<{
  status: string;
  message: string;
  data: { booking: BookTripResponse };
}> => {
  const response = await fetch(`${API_BASE_URL}/trips/${payload.tripId}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ seats: payload.seats }),
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────
//  TRIP BOOKINGS (for drivers) — GET /trips/:id/bookings
// ─────────────────────────────────────────────────────────────

export interface TripBookingPassenger {
  bookingId: string;
  seatsBooked: number;
  totalPrice: number;
  status: BookingStatus;
  rider: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}

export const getTripBookings = async (
  tripId: string,
  token: string
): Promise<{
  status: string;
  results: number;
  data: TripBookingPassenger[];
}> => {
  const response = await fetch(`${API_BASE_URL}/trips/${tripId}/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────
//  CENTRALIZED DATA LOADER
// ─────────────────────────────────────────────────────────────

import type { AppDispatch, RootState } from "@/store";
import {
  setBookedTrips,
  setBookedTripsLoading,
} from "@/store/slices/bookingSlice";
import {
  setTripHistory,
  setTripLoading,
  setTripError,
} from "@/store/slices/tripSlice";

export const loadRiderData = async (
  token: string,
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const state = getState();
  const bookedTrips = state.booking.bookedTrips;
  if (bookedTrips.length > 0) return;

  dispatch(setBookedTripsLoading(true));
  try {
    const result = await getBookedTrips(token);
    dispatch(setBookedTrips(result.data.bookings));
  } catch (_) {
    // silently fail — pages handle their own error states
  } finally {
    dispatch(setBookedTripsLoading(false));
  }
};

export const loadDriverData = async (
  token: string,
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const state = getState();
  const tripHistory = state.trip.tripHistory;
  if (tripHistory.length > 0) return;

  dispatch(setTripLoading(true));
  dispatch(setTripError(null));
  try {
    const result = await getMyTrips(token);
    dispatch(setTripHistory(result.data.trips));
  } catch (err: any) {
    dispatch(setTripError(err?.message || "Failed to load trips"));
  } finally {
    dispatch(setTripLoading(false));
  }
};

// ─────────────────────────────────────────────────────────────
//  DRIVER REGISTRATION — POST /users/register-driver
// ─────────────────────────────────────────────────────────────

export interface RegisterDriverPayload {
  password: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address?: string;
    city?: string;
    state?: string;
  };
  verificationDocuments: {
    driversLicense: {
      front: string;
      back: string;
      number: string;
      expiryDate: string;
    };
    nationalId: {
      number: string;
      document: string;
    };
    verificationSelfie: string;
  };
  contacts: {
    emergency: {
      fullName: string;
      phoneNumber: string;
      relationship: string;
    };
    guarantor: {
      fullName: string;
      phoneNumber: string;
      address: string;
      relationshipAndOccupation: string;
    };
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
    plateNumber: string;
    passengerSeats: number;
    vin: string;
    photos: Array<{ label: string; file: string }>;
    documents: {
      registrationCertificate: string;
      insuranceCertificate: string;
      roadWorthiness: string;
    };
  };
}

export const registerDriver = async (
  formData: FormData
): Promise<{ status: string; token: string; data: { driver: DriverUser } }> => {
  const response = await fetch(`${API_BASE_URL}/users/register-driver`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));

    console.error("registerDriver error:", errData);
    throw new Error(
      errData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};
