import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Login function
  const login = async (identifier, password, role) => {
    try {
      if (role === "admin") {
        // 🔹 Local admin login check (no API call)
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
      } else {
        // 🔹 Student login via API
        const res = await axios.post("http://localhost:8080/api/student/login", {
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
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.msg || "Something went wrong",
      };
    }
  };

  // ✅ Signup function (only for students)
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/student/signup", {
        name,
        email,
        password,
      });

      if (!res.data || !res.data.token) {
        return { success: false, message: res.data?.msg || "Signup failed" };
      }

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.msg || "Something went wrong",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
