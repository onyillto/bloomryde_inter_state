/**
 * Centralized API request functions.
 * It's good practice to use environment variables for the base URL.
 * Create a .env.local file in your root directory and add:
 * NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

/**
 * A helper function to handle API responses and errors.
 * @param response The Response object from a fetch call.
 */
async function handleResponse(response: Response) {
  // If the response is not OK (status code 200-299), parse the error and throw it.
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  // Otherwise, parse and return the JSON data.
  return response.json();
}

/**
 * A generic and reusable function for making API requests.
 * @param endpoint The API endpoint to call (e.g., '/users/login-rider').
 * @param options The RequestInit options for the fetch call.
 */
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  return handleResponse(response);
}

// --- Authentication API Calls ---

/**
 * Requests an OTP for a given phone number.
 * Corresponds to: POST /users/request-otp
 */
export const requestOTP = (phoneNumber: string) => {
  return apiRequest("/users/request-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });
};

/**
 * Verifies an OTP for a given phone number.
 * Corresponds to: POST /users/verify-otp
 */
export const verifyOTP = (phoneNumber: string, otp: string) => {
  return apiRequest("/users/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber, otp }),
  });
};

/**
 * Logs in a rider with email and password.
 * Corresponds to: POST /users/login-rider
 */
export const loginRider = (credentials: { email: string; password: string }) => {
  return apiRequest("/users/login-rider", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

/**
 * Registers a new rider.
 * Corresponds to: POST /users/register-rider
 * Note: You should create a specific TypeScript type for 'riderData'.
 */
export const registerRider = (riderData: any) => {
  return apiRequest("/users/register-rider", {
    method: "POST",
    body: JSON.stringify(riderData),
  });
};

// You can add more API functions here for drivers, trips, etc. as you build them.
