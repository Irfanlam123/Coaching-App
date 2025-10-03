import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Smartphone, Shield, Users } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const identifier = role === "user" ? email : username;
    const res = await login(identifier, password, role);

    if (res.success) {
      toast.success(`${role === "admin" ? "Admin" : "User"} logged in successfully ✅`, { position: "top-right" });
      navigate("/", { replace: true });
    } else {
      setError(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#043D3B] to-[#0A5C59]">
      
      {/* Left side image - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#043D3B]/90 to-[#0A5C59]/90"></div>
        <div className="relative z-10 w-full flex items-center justify-center p-8 lg:p-12 xl:p-16">
          <div className="text-white text-center max-w-lg xl:max-w-2xl">
            <div className="mb-8 xl:mb-12">
              <img
                src="./src/assets/login.jpg"
                alt="Collaboration"
                className="rounded-3xl shadow-2xl mx-auto w-full max-w-sm lg:max-w-md xl:max-w-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 xl:mb-6 leading-tight">Welcome To ViraamVaani!</h1>
            <p className="text-xl xl:text-2xl opacity-95 leading-relaxed">Sign in to continue your journey with us and access amazing features</p>
          </div>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-1/2 xl:w-5/12 flex items-center justify-center py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md lg:max-w-lg bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border border-teal-200/50">
          
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-teal-100 rounded-full">
                <Smartphone className="h-6 w-6 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Viraam Vaani</h1>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Login as</label>
              <div className="flex rounded-xl bg-gray-100 p-1.5 gap-1">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    role === "user" 
                      ? "bg-white text-[#0A5C59] shadow-lg shadow-teal-100 border border-teal-200" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setRole("user")}
                >
                  <Users className="h-4 w-4" />
                  User
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    role === "admin" 
                      ? "bg-white text-[#0A5C59] shadow-lg shadow-teal-100 border border-teal-200" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setRole("admin")}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </button>
              </div>
            </div>

            {/* Conditional input fields */}
            {role === "user" ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#0A5C59] transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-10 py-3.5 focus:outline-none focus:ring-3 focus:ring-[#0A5C59]/20 focus:border-[#0A5C59] transition-all duration-300 hover:border-gray-400"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#0A5C59] transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-10 py-3.5 focus:outline-none focus:ring-3 focus:ring-[#0A5C59]/20 focus:border-[#0A5C59] transition-all duration-300 hover:border-gray-400"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#0A5C59] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-10 pr-12 py-3.5 focus:outline-none focus:ring-3 focus:ring-[#0A5C59]/20 focus:border-[#0A5C59] transition-all duration-300 hover:border-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white py-4 rounded-xl font-semibold hover:from-[#032826] hover:to-[#084b48] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Signup link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="font-semibold text-[#0A5C59] hover:text-[#043D3B] transition-colors duration-300 underline underline-offset-2"
                >
                  Create account
                </Link>
              </p>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}