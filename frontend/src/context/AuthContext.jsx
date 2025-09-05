import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Login function (user/admin based on role)
  const login = async (email, password, role = "user") => {
    try {
      const endpoint =
        role === "admin"
          ? "http://localhost:8080/api/admin/login"
          : "http://localhost:8080/api/user/login";

      const res = await axios.post(endpoint, { email, password });

      if (res.data.success) {
        const loggedInUser = res.data[role]; // backend se "user" ya "admin" aayega

        // Save in state + localStorage
        setUser({ ...loggedInUser, role });
        localStorage.setItem("user", JSON.stringify({ ...loggedInUser, role }));

        return { success: true, role }; // return role for redirect
      }
      return { success: false };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  };

  // ✅ Signup function (sirf user ke liye, admin ka signup usually nahi hota)
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/user/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        return true; // Signup ke baad login page dikhega
      }
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  // ✅ Logout function
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
