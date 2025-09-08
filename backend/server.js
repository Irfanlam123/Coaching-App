require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Import routes
const studyMaterialRoutes = require("./routes/studyRoute");
const serviceRoutes = require("./routes/servicesRoutes");
const timeTableRoutes = require("./routes/timeTableRoutes"); // ✅ Added timetable routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded files (PDFs, Images, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/admin", require("./routes/admin"));     // Admin routes
app.use("/api/student", require("./routes/student")); // Student routes
app.use("/api/materials", studyMaterialRoutes);       // Study material routes
app.use("/api/services", serviceRoutes);              // Services routes
app.use("/api/timetable", timeTableRoutes);           // TimeTable routes

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
