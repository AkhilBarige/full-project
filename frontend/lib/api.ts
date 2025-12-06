import axios from "axios";
import { getToken } from "./auth"; // ✅ centralized token getter

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
    withCredentials: true,
});

// Request interceptor → attach token only for protected routes
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = getToken(); // ✅ use helper
            // ✅ Skip attaching token for login/signup routes
            if (
                token &&
                !config.url?.includes("/auth/login") &&
                !config.url?.includes("/auth/signup")
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
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);