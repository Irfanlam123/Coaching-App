const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes import
const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/")
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);   // Signup/Login
// app.use("/api/user", userRoutes);   // User-specific routes
app.use("/api/admin", adminRoutes); // Admin-specific routes

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
