import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;
export const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();
    const requestHeaders = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: requestHeaders
    });
    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(responseData?.message || "Une erreur est survenue");
    }

    return responseData;
};
