import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Close sidebar by setting state in localStorage
      localStorage.setItem("sidebarOpen", "false");
      
      if (user.role === "admin") {
        navigate("/", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const identifier = role === "admin" ? username : email;
      const result = await login(identifier, password, role);

      if (result.success) {
        // Ensure sidebar is closed after login
        localStorage.setItem("sidebarOpen", "false");

        if (role === "user") {
          localStorage.setItem("userEmail", email);
          toast.success("User logged in successfully ✅", {
            position: "top-right",
          });
          navigate("/", { replace: true });
        } else {
          toast.success("Admin logged in successfully ✅", {
            position: "top-right",
          });
          navigate("/", { replace: true });
        }
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#043D3B] to-[#0A5C59]">
      {/* Left side image - hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-[#043D3B] to-[#0A5C59]">
        <div className="w-full flex items-center justify-center p-4 md:p-8 lg:p-12">
          <div className="text-white text-center max-w-md">
            <img
              src="./src/assets/login.jpg"
              alt="Collaboration"
              className="rounded-2xl shadow-2xl mb-6 md:mb-8 mx-auto w-full max-w-xs md:max-w-sm lg:max-w-md"
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Welcome Back!</h1>
            <p className="text-base md:text-lg lg:text-xl opacity-90">
              Sign in to continue your journey with us
            </p>
          </div>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-teal-100">
          {/* Mobile-only header */}
          <div className="lg:hidden mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Smartphone className="h-6 w-6 text-teal-600" />
              <span className="text-sm text-teal-700">Mobile Access</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome to Viraam Vaani</h1>
          </div>

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-center hidden lg:block">
              Welcome to{" "}
              <span className="inline-block bg-gradient-to-r from-[#043D3B] via-[#0A5C59] to-[#0A5C59] bg-clip-text text-transparent">
                <span className="mr-1">Viraam</span>
                <span className="text-gray-700 drop-shadow-md">Vaani</span>
              </span>
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Sign in to access your personalized dashboard
            </p>
          </div>

          <form className="mt-6 md:mt-8 space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="rounded-md shadow-sm space-y-3 md:space-y-4">
              {/* Role Selector */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Login as
                </label>
                <div className="flex rounded-md bg-gray-100 p-1">
                  <button
                    type="button"
                    className={`flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-md text-sm font-medium transition-colors ${
                      role === "user"
                        ? "bg-white text-[#0A5C59] shadow-sm ring-1 ring-teal-100"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setRole("user")}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-md text-sm font-medium transition-colors ${
                      role === "admin"
                        ? "bg-white text-[#0A5C59] shadow-sm ring-1 ring-teal-100"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setRole("admin")}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* Conditional fields */}
              {role === "user" ? (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2.5 md:py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] text-sm transition-colors"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2.5 md:py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] text-sm transition-colors"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full pl-10 pr-12 py-2.5 md:py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] text-sm transition-colors"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#0A5C59] focus:ring-[#0A5C59] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#0A5C59] hover:text-[#043D3B] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 md:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#043D3B] to-[#0A5C59] hover:from-[#032826] hover:to-[#084b48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A5C59] disabled:opacity-70 transition-all"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#0A5C59] hover:text-[#043D3B] transition-colors"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}