require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/admin");

// Controllers
const { cleanupExpiredMaterials } = require("./controllers/studyController");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);

// Cleanup expired materials every hour (if you have this feature)
setInterval(cleanupExpiredMaterials, 60 * 60 * 1000);
setTimeout(cleanupExpiredMaterials, 5000);

// Root Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
