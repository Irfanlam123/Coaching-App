require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const StudyMaterial = require("./models/study");

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

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
// Delete expired study materials every 1 minute
setInterval(async () => {
  try {
    const now = new Date();
    const expiredMaterials = await StudyMaterial.find({
      expiresAt: { $ne: null, $lt: now },
    });

    for (let material of expiredMaterials) {
      // Delete file from local uploads folder
      const filePath = path.join(__dirname, "uploads", material.pdfFile);
      fs.unlink(filePath, (err) => {
        if (err) console.error("🗑 Auto delete file error:", err);
      });

      // Delete from MongoDB
      await StudyMaterial.findByIdAndDelete(material._id);
      console.log(`🗑 Deleted expired material: ${material.materialName}`);
    }
  } catch (error) {
    console.error("🛑 Cleanup job error:", error);
  }
}, 60 * 1000);

// ----------------- START SERVER ----------------- //
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
