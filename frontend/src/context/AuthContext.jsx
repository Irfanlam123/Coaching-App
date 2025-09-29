import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (identifier, password, role) => {
    try {
      if (role === "admin") {
        if (identifier === "admin123" && password === "admin@123") {
          const loggedInAdmin = {
            name: "Admin",
            username: "admin123",
            role: "admin",
            token: "dummy-admin-token",
          };
          setUser(loggedInAdmin);
          localStorage.setItem("user", JSON.stringify(loggedInAdmin));
          return { success: true, user: loggedInAdmin };
        } else {
          return { success: false, message: "Invalid admin credentials" };
        }
      }

      // ✅ FIXED student login URL
      const res = await axios.post("http://localhost:8080/api/students/login", {
        email: identifier,
        password,
      });

      if (!res.data || !res.data.token) {
        return { success: false, message: res.data?.msg || "Login failed" };
      }

      const loggedInUser = {
        _id: res.data.user?._id,
        name: res.data.user?.name,
        email: res.data.user?.email,
        role: "user",
        token: res.data.token,
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.msg || "Something went wrong" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
