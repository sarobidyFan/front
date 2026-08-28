import { apiRequest } from "./apiClient";

export const login = (email, password) =>
    apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
