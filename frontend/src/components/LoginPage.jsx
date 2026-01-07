import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { login as loginApi } from "../services/auth";

export default function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await loginApi(username, password);
      setIsLoggedIn(true);
      setLoginSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginSuccess) navigate("/dashboard");
  }, [loginSuccess, navigate]);

  return (
    <div className="container mx-auto text-center mt-20">
      <div className="mt-12">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-2xl shadow-md w-96 mx-auto">
          <h1 className="text-4xl mb-4">Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Username"
            autoComplete="username"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Password"
            autoComplete="current-password"
          />

          {loading && (
            <div className="flex justify-center mb-4">
              <ClipLoader color="#2563EB" loading={loading} size={35} />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-lg text-white rounded-lg ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 focus:outline-none"
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Seed admin (backend .env): admin / 123456
          </p>
        </form>
      </div>
    </div>
  );
}
