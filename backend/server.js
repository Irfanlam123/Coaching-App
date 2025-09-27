require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Routes
const studyMaterialRoutes = require("./routes/studyRoute");
const timeTableRoutes = require("./routes/timeTableRoutes");
const serviceRoutes = require("./routes/servicesRoutes");
const studentRoutes = require("./routes/student");

const { cleanupExpiredMaterials } = require("./controllers/studyController");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API Routes
app.use("/api/materials", studyMaterialRoutes);
app.use("/api/notifications", timeTableRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/students", studentRoutes);

// Serve frontend if deployed
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build"))); // Assuming React build in client/build
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("✅ API is running..."));
}

// Cleanup expired materials every hour
setInterval(cleanupExpiredMaterials, 60 * 60 * 1000);
setTimeout(cleanupExpiredMaterials, 5000);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
