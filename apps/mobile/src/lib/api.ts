import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// In React Native/Expo, localhost on Android emulator points to the device itself.
// We must use the local network IP or 10.0.2.2 for Android emulator.
// Change 192.168.1.2 to your actual local IP address if running on a physical device over WiFi.
const getApiUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;

  if (Platform.OS === "android") {
    // 10.0.2.2 is the special alias to your host loopback interface in Android emulator
    return "http://10.0.2.2:3001/api";
  }

  // Default fallback for iOS simulator
  return "http://localhost:3001/api";
};

export const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("habibi_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore reading error
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem("habibi_token");
      } catch (e) {
        // Ignore removal error
      }
    }
    return Promise.reject(error);
  },
);

export default api;
