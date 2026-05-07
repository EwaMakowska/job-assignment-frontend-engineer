import axios from "axios";
import { useAuthStore } from "../store/auth";

const baseURL = `${process.env.REACT_APP_API_URL ?? "http://localhost:3000"}/api`;

export const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// TODO: response interceptor that clears auth and redirects to /login on HTTP 401.
// Skipped to stay within the README's scope guidance.
