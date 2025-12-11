import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.log("LocalStorage error:", err);
  }
  return config;
});


let isRefreshing = false;
let pendingRequests = [];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;

    // If 401 AND not already retried
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      // Avoid spam refresh requests
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;

      try {
        // Call backend to refresh token
        const { data } = await api.post("/api/auth/refresh");

        const newToken = data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // Retry failed requests
        pendingRequests.forEach((cb) => cb(newToken));
        pendingRequests = [];

        // Retry original request
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);

      } catch (err) {
        console.log("Refresh failed:", err);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
