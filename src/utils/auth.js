export const saveAuthentication = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
};

export const isAuthenticated = () => Boolean(getToken());

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
