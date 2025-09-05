import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const res = await login(emailOrUsername, password, role);

    if (res.success) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert("Invalid credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#043D3B] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to access your account
            </p>
          </div>

          {/* Role Switch */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-center font-medium transition-all ${
                role === "user" 
                  ? "bg-[#043D3B] text-white shadow-md" 
                  : "text-gray-600 hover:text-[#043D3B]"
              }`}
              onClick={() => setRole("user")}
            >
              User Login
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-center font-medium transition-all ${
                role === "admin" 
                  ? "bg-[#043D3B] text-white shadow-md" 
                  : "text-gray-600 hover:text-[#043D3B]"
              }`}
              onClick={() => setRole("admin")}
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email/Username */}
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-medium">
                {role === "admin" ? "Username" : "Email"}
              </label>
              <input
                type="text"
                placeholder={role === "admin" ? "Enter your username" : "Enter your email"}
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043D3B] focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043D3B] focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#043D3B] text-white py-3 rounded-lg font-semibold hover:bg-[#065755] transition-all flex items-center justify-center shadow-md"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-[#043D3B] hover:underline text-sm">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-white text-sm">
            Don't have an account?{" "}
            <a href="#" className="font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;