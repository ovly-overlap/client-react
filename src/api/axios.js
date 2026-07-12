import axios from "axios";

// export const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
// });

// src/api/axios.js (또는 api가 정의된 파일)

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json; charset=UTF-8;",
        accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
