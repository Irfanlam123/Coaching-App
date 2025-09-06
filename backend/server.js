require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/student", require("./routes/student"));

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
