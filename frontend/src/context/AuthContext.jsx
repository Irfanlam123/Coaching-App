import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  const login = async (identifier, password, role) => {
    try {
      if (role === "admin") {
        if (identifier === "admin123" && password === "admin@123") {
          const loggedInAdmin = { name: "Admin", username: "admin123", role: "admin", token: "dummy-admin-token" };
          setUser(loggedInAdmin);
          localStorage.setItem("user", JSON.stringify(loggedInAdmin));
          return { success: true, user: loggedInAdmin };
        } else {
          return { success: false, message: "Invalid admin credentials" };
        }
      }

      const res = await axios.post("http://localhost:8080/api/students/login", { email: identifier, password });
      const loggedInUser = { _id: res.data.user._id, name: res.data.user.name, email: res.data.user.email, role: "user", token: res.data.token };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return { success: true, user: loggedInUser };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Something went wrong" };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/students/signup", { name, email, password });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Something went wrong" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};
