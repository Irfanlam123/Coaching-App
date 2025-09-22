require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

// Import routes
const studyMaterialRoutes = require("./routes/studyRoute");
const serviceRoutes = require("./routes/servicesRoutes");
const timeTableRoutes = require("./routes/timeTableRoutes");
const StudyMaterial = require("./models/study");

const app = express();

// Connect to MongoDB
connectDB();

// ----------------- MIDDLEWARE ----------------- //
// CORS setup
app.use(
  cors({
    origin: [     
      "http://localhost:5173", // your local frontend
      "https://coaching-app-41n5.onrender.com", // deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------- ROUTES ----------------- //
app.use("/api/admin", require("./routes/admin"));     // Admin routes
app.use("/api/student", require("./routes/student")); // Student routes
app.use("/api/materials", studyMaterialRoutes);      // Study material routes
app.use("/api/services", serviceRoutes);             // Services routes
app.use("/api/notifications", timeTableRoutes);     // TimeTable routes

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ----------------- BACKGROUND CLEANUP ----------------- //
// Delete expired study materials every 1 minute
setInterval(async () => {
  try {
    const now = new Date();
    const expiredMaterials = await StudyMaterial.find({
      expiresAt: { $ne: null, $lt: now },
    });

    for (let material of expiredMaterials) {
      const filePath = path.join(__dirname, "uploads", material.pdfFile);

      fs.unlink(filePath, (err) => {
        if (err) console.error("Auto delete file error:", err);
      });

      await StudyMaterial.findByIdAndDelete(material._id);
      console.log(`🗑 Deleted expired material: ${material.materialName}`);
    }
  } catch (error) {
    console.error("Cleanup job error:", error);
  }
}, 60 * 1000);

// ----------------- START SERVER ----------------- //
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
