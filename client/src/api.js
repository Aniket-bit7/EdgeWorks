import axios from "axios";
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://edgeworks.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL.replace(/\/$/, ""), // remove trailing slash
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
