require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studyMaterialRoutes = require("./routes/studyRoute");
const { cleanupExpiredMaterials } = require("./controllers/studyController");

const app = express();
connectDB();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/materials", studyMaterialRoutes);
app.get("/", (req, res) => res.send("✅ API is running..."));

// Cleanup expired materials every hour
setInterval(cleanupExpiredMaterials, 60 * 60 * 1000);
setTimeout(cleanupExpiredMaterials, 5000);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
