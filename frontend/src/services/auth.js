import axios from "axios";

export const login = async (username, password) => {
  const { data } = await axios.post("/api/auth/login", { username, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isLoggedIn = () => !!localStorage.getItem("token");

export const getUser = () => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};
