import { api } from "./axios";

export const getProfile = async (userId) => {
  const token = localStorage.getItem("accessToken");
  const response = await api.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
