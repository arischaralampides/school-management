import client from "../api/client";

export const login = async (username, password) => {
  const { data } = await client.post("/api/auth/login", { username, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isLoggedIn = () => !!localStorage.getItem("token");
