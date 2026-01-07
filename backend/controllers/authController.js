import { login } from "../services/authService.js";

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const result = await login({ username, password });
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};
