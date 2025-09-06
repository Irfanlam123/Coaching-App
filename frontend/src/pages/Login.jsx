// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");     // for user login
  const [username, setUsername] = useState(""); // for admin login
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default user
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "";
      let payload = {};

      if (role === "admin") {
        // ✅ Admin login ke liye username + password
        url = "http://localhost:8080/api/admin/login";
        payload = { username, password };
      } else {
        // ✅ User login ke liye email + password
        url = "http://localhost:8080/api/auth/login";
        payload = { email, password };
      }

      const res = await axios.post(url, payload);

      if (res.data.success) {
        // Save user/admin info in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.user, role })
        );

        // Redirect role ke hisaab se
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Conditional fields */}
        {role === "user" ? (
          <>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}

        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="block mb-2">Role</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
