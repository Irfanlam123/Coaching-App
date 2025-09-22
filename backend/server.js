require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { cleanupExpiredMaterials } = require("./controllers/studyController");

// Import routes
const studyMaterialRoutes = require("./routes/studyRoute");
const serviceRoutes = require("./routes/servicesRoutes");
const timeTableRoutes = require("./routes/timeTableRoutes");

const app = express();

// ----------------- DATABASE ----------------- //
connectDB(); // Connect to MongoDB

// ----------------- MIDDLEWARE ----------------- //
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://coaching-app-41n5.onrender.com", // deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------- ROUTES ----------------- //
app.use("/api/admin", require("./routes/admin"));
app.use("/api/student", require("./routes/student"));
app.use("/api/materials", studyMaterialRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/notifications", timeTableRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ----------------- BACKGROUND CLEANUP ----------------- //
// Delete expired study materials every hour
setInterval(async () => {
  console.log("🔄 Running cleanup job for expired materials...");
  await cleanupExpiredMaterials();
}, 60 * 60 * 1000); // Run every hour

// Run cleanup immediately on startup
cleanupExpiredMaterials();

// ----------------- START SERVER ----------------- //
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));