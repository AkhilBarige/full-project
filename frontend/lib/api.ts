import axios from "axios";
import { getToken, clearToken } from "./auth"; // centralized helpers

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
    withCredentials: true, // keep if backend sets cookies
});

// Request interceptor → attach token only for protected routes
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = getToken(); // reads cookie first, fallback localStorage
            if (
                token &&
                !config.url?.includes("/auth/login") &&
                !config.url?.includes("/auth/signup") &&
                !config.url?.includes("/auth/change-password")
            ) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor → handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or unauthorized → clear token + redirect
            if (typeof window !== "undefined") {
                clearToken(); // ✅ removes from cookie + localStorage
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);