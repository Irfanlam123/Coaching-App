import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Login function with role
  const login = async (email, password, role) => {
    try {
      const endpoint =
        role === "admin"
          ? "http://localhost:8080/api/admin/login"
          : "http://localhost:8080/api/user/login";

      const res = await axios.post(endpoint, { email, password });

      if (res.data.success) {
        const loggedInUser = { ...res.data.user, role }; // role add kiya

        // Save in state + localStorage
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        return { success: true, role };
      }
      return { success: false };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  };

  // ✅ Signup function (only for users)
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/user/signup", {
        name,
        email,
        password,
      });

      return res.data.success;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
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
