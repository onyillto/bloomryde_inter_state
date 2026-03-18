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
//  SHARED TYPES
// ─────────────────────────────────────────────────────────────

interface FileDocument {
  fileName: string;
  fileSize: string;
  url: string;
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
      front: FileDocument;
      back: FileDocument;
      number: string;
      expiryDate: string;
    };
    nationalId: {
      number: string;
      document: FileDocument;
    };
    verificationSelfie: FileDocument;
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
      file: FileDocument;
      _id: string;
    }>;
    documents: {
      registrationCertificate: FileDocument;
      insuranceCertificate: FileDocument;
      roadWorthiness: FileDocument;
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

export const registerRider = (riderData: any) =>
  apiRequest("/users/register-rider", {
    method: "POST",
    body: JSON.stringify(riderData),
  });

export const getUserProfile = (token: string) =>
  apiRequest("/users/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

// ─────────────────────────────────────────────────────────────
//  PROFILE UPDATE
// ─────────────────────────────────────────────────────────────

export interface UpdateUserProfilePayload {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth?: string;
}

export const updateUserProfile = async (
  payload: UpdateUserProfilePayload,
  token: string
): Promise<RiderUser> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
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

  const responseData = await response.json();
  return responseData.data.user;
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
  coordinates: [number, number]; // [lng, lat] — auto-generated by backend
  _id?: string;
}

// Stop shape for CREATE payload — coordinates optional, backend fills them
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

// Vehicle shape returned inside trip from GET /trips/my-trips (populated)
export interface TripVehicle {
  make: string;
  model: string;
  year: string;
  color: string;
  plateNumber: string;
}

// Full Trip shape — matches GET /trips/my-trips response
export interface Trip {
  _id: string;
  id: string;
  driver: string;
  vehicle: TripVehicle | string; // populated object from /my-trips, string id from POST /trips
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

// Create Trip Payload — matches POST /trips body
// originAddress and destinationAddress are flat strings.
// Backend geocodes them into full TripLocation objects with coordinates.
export interface CreateTripPayload {
  originAddress: string; // e.g. "Ikeja City Mall, Lagos"
  destinationAddress: string; // e.g. "Jabi Lake Mall, Abuja"
  departureTime: string; // ISO date string
  pricePerSeat: number;
  totalSeats: number;
  stops?: TripStopInput[]; // optional — coordinates auto-generated
  preferences: TripPreferences;
  description?: string;
}

// ─────────────────────────────────────────────────────────────
//  TRIP ENDPOINTS
// ─────────────────────────────────────────────────────────────

/**
 * Creates a new trip.
 * Corresponds to: POST /trips
 */
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

/**
 * Fetches all trips for the logged-in driver.
 * Corresponds to: GET /trips/my-trips
 */
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

/**
 * Fetches a single trip by ID.
 * Corresponds to: GET /trips/:id
 */
export const getTripById = (tripId: string, token: string) =>
  apiRequest(`/trips/${tripId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

/**
 * Cancels a trip.
 * Corresponds to: PATCH /trips/:id/cancel
 */
export const cancelTrip = (tripId: string, token: string) =>
  apiRequest(`/trips/${tripId}/cancel`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });



  // ─────────────────────────────────────────────────────────────
//  PUBLIC TRIP SEARCH (for riders)
// ─────────────────────────────────────────────────────────────

export interface TripSearchParams {
  origin?: string;        // city name filter
  destination?: string;   // city name filter
  date?: string;          // ISO date string
  seats?: number;         // minimum available seats needed
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
  origin: string;        // e.g. "Ikeja City Mall"
  destination: string;   // e.g. "Jabi Lake Mall, Jabi"
  departureDate: string; // ISO date string e.g. "2024-12-25"
  passengers: number;    // minimum seats needed
}

/**
 * Searches available trips for riders.
 * Corresponds to: POST /trips/search
 * Requires auth token.
 */
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