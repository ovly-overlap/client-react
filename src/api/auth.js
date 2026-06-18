import { api } from "./axios";

export const getMe = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const login = async (username, password) => {
    const response = await api.post("/auth/login", {
        username,
        password,
    });

    return response.data;
};

export const logout = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
};
