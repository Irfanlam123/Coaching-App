require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studyMaterialRoutes = require("./routes/studyRoute") // exact filename

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded PDFs
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/admin", require("./routes/admin"));      // Admin routes
app.use("/api/student", require("./routes/student"));  // Student routes
app.use("/api/materials", studyMaterialRoutes);       // Study material routes

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
