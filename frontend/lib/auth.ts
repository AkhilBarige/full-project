import { api } from "./api"; // ✅ axios instance

const TOKEN_KEY = "accessToken"; // centralized key

// Save token to both cookie + localStorage
export const saveToken = (token: string): void => {
    if (typeof window !== "undefined" && token) {
        // LocalStorage (optional, for client-side reads)
        localStorage.setItem(TOKEN_KEY, token);

        // Cookie (for middleware + server-side checks)
        document.cookie = `${TOKEN_KEY}=${token}; path=/; secure; samesite=lax`;
    }
};

// Retrieve token (prefer cookie, fallback to localStorage)
export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        // Try cookie first
        const match = document.cookie.match(new RegExp(`(^| )${TOKEN_KEY}=([^;]+)`));
        if (match) return match[2];

        // Fallback to localStorage
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

// Clear token from both cookie + localStorage
export const clearToken = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);

        // Expire cookie
        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};

// ✅ Logout helper
export const logout = (): void => {
    if (typeof window !== "undefined") {
        clearToken();
        window.location.href = "/login"; // redirect to login page
    }
};

// Change password API call
export const changePassword = async (
    oldPassword: string,
    newPassword: string
): Promise<{ message: string }> => {
    try {
        const res = await api.post("/auth/change-password", {
            oldPassword,
            newPassword,
        });
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error changing password" };
    }
};

// Optional: Login API call
export const login = async (
    email: string,
    password: string
): Promise<{ accessToken: string; user: any }> => {
    try {
        const res = await api.post("/auth/login", { email, password });
        return res.data.data; // ✅ correct, matches backend
    } catch (err: any) {
        throw err.response?.data || { message: "Login failed" };
    }
};

// Optional: Signup API call
export const signup = async (
    email: string,
    password: string,
    username: string
): Promise<{ message: string }> => {
    try {
        const res = await api.post("/auth/signup", { email, password, username });
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Signup failed" };
    }
};