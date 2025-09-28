const express = require("express");
const router = express.Router();
const { getResultByEmail, addResults, adminLogin } = require("../controllers/adminController");
const { adminAuth } = require("../middlewares/auth");

// Admin login
router.post("/login", adminLogin);

// Add Results (protected)
router.post("/results/add", adminAuth, addResults);

// Get result by email (protected)
router.get("/results/:email", adminAuth, getResultByEmail);

module.exports = router;
