import axios from "axios";
import { useAuthStore } from "@/store/authStore";

let isRefreshing = false;
let queue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(null);
  });
  queue = [];
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true // 쿠키 자동 포함
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await api.post("/auth/refresh");
      processQueue(null);
      return api(originalRequest);
    } catch (err) {
      processQueue(err);
      useAuthStore.getState().clearUser();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
