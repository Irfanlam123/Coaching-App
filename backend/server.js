// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");

// Models
const Admin = require("./models/Admin");

// Routes import
const authRoutes = require("./routes/authRoutes");   // User Signup/Login
const adminRoutes = require("./routes/adminRoutes"); // Admin Login

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Default admin create function
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin123" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("adminpass", 10);
      await Admin.create({
        username: "admin123",
        password: hashedPassword,
      });
      console.log(
        "✅ Default admin created: username=admin123, password=adminpass"
      );
    } else {
      console.log("ℹ️ Default admin already exists");
    }
  } catch (err) {
    console.error("Error creating default admin:", err.message);
  }
};

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await createDefaultAdmin();
});
