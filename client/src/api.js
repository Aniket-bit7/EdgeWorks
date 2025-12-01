import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Final working interceptor (lazy localStorage access)
api.interceptors.request.use((config) => {
  try {
    const token = window.localStorage.getItem("accessToken");
    console.log("Interceptor Token:", token);

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.log("LocalStorage inaccessible:", err);
  }

  return config;
});
