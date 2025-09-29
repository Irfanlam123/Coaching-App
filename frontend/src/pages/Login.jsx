import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Smartphone } from "lucide-react";
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
      
      {/* Left side image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-[#043D3B] to-[#0A5C59]">
        <div className="w-full flex items-center justify-center p-8 lg:p-12">
          <div className="text-white text-center max-w-md">
            <img
              src="./src/assets/login.jpg"
              alt="Collaboration"
              className="rounded-2xl shadow-2xl mb-6 mx-auto w-full max-w-sm lg:max-w-md"
            />
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Welcome To ViraamVaani!</h1>
            <p className="text-lg lg:text-xl opacity-90">Sign in to continue your journey with us</p>
          </div>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-6 lg:py-12 px-6">
        <div className="w-full max-w-md bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-teal-100">
          
          <div className="lg:hidden mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Smartphone className="h-6 w-6 text-teal-600" />
              <span className="text-sm text-teal-700">Mobile Access</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome to Viraam Vaani</h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm">{error}</div>
            )}

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Login as</label>
              <div className="flex rounded-md bg-gray-100 p-1">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                    role === "user" ? "bg-white text-[#0A5C59] shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setRole("user")}
                >
                  User
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                    role === "admin" ? "bg-white text-[#0A5C59] shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Conditional input fields */}
            {role === "user" ? (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            ) : (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition"
                    placeholder="Enter your username"
                  />
                  <User className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white py-2.5 rounded-lg font-medium hover:from-[#032826] hover:to-[#084b48] transition"
            >
              {loading ? "Signing in..." : "Sign in"} <ArrowRight className="inline ml-1 h-4 w-4" />
            </button>

            {/* Signup link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-[#0A5C59] hover:text-[#043D3B] transition">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
