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