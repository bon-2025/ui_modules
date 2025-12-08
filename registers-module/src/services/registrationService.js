// src/services/registrationService.js
import axios from "axios";

// Create Axios instance with backend URL
const server = axios.create({
  baseURL: "http://localhost:8080", // your Spring Boot backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API wrapper
export const API = () => ({
  GET: (url, params = {}, config = {}) =>
    server.get(url, { params, ...config }).then(res => res.data),

  POST: (url, data = {}, config = {}) =>
    server.post(url, data, config).then(res => res.data),

  PUT: (url, data = {}, config = {}) =>
    server.put(url, data, config).then(res => res.data),

  DELETE: (url, params = {}, config = {}) =>
    server.delete(url, { params, ...config }).then(res => res.data),
});

// Function to register a death record
export async function registerUser(data) {
  try {
    console.log("Sending payload to backend:", data);

    // POST request to backend endpoint
    const response = await API().POST("/user/register_record", data);

    // Expecting backend response like { success: true, message: "...", data: {...} }
    if (response?.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response?.message || "Registration failed" };
    }
  } catch (error) {
    // Axios network or server errors
    const message =
      error.response?.data?.message || // backend error message
      error.response?.data ||          // backend raw response
      error.message ||                 // network or Axios error
      "Request failed";

      console.log(message)

    return { success: false, message };
  }
}
