// // Save token to localStorage
// export const saveToken = (token: string): void => {
//     if (typeof window !== "undefined" && token) {
//         localStorage.setItem("accessToken", token); // ✅ consistent key
//     }
// };

// // Retrieve token from localStorage
// export const getToken = (): string | null => {
//     if (typeof window !== "undefined") {
//         return localStorage.getItem("accessToken"); // ✅ same key
//     }
//     return null; // return null on server
// };

// // Clear token from localStorage
// export const clearToken = (): void => {
//     if (typeof window !== "undefined") {
//         localStorage.removeItem("accessToken"); // ✅ same key
//     }
// };

import { api } from "./api"; // your axios instance

// Save token to localStorage
export const saveToken = (token: string): void => {
    if (typeof window !== "undefined" && token) {
        localStorage.setItem("accessToken", token); // ✅ consistent key
    }
};

// Retrieve token from localStorage
export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken"); // ✅ same key
    }
    return null; // return null on server
};

// Clear token from localStorage
export const clearToken = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken"); // ✅ same key
    }
};

// Change password API call
export const changePassword = async (
    oldPassword: string,
    newPassword: string
): Promise<any> => {
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