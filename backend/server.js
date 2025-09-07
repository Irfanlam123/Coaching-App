require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Admin routes (login, add results, get result by email)
app.use("/api/admin", require("./routes/admin"));

// Student routes (optional for future)
app.use("/api/student", require("./routes/student"));

// Test route to check server is working
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
