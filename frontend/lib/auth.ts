import { api } from "./api"; // ✅ axios instance

const TOKEN_KEY = "accessToken"; // centralized key

// Save token to localStorage
export const saveToken = (token: string): void => {
    if (typeof window !== "undefined" && token) {
        localStorage.setItem(TOKEN_KEY, token);
    }
};

// Retrieve token from localStorage
export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

// Clear token from localStorage
export const clearToken = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
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
        return res.data.data;
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