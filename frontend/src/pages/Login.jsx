import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // default: user
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(emailOrUsername, password, role);

    if (res.success) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>

        {/* Role Switch */}
        <div className="flex justify-center mb-4 space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              role === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Email/Username */}
        <input
          type="text"
          placeholder={role === "admin" ? "Username" : "Email"}
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
