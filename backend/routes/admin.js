const express = require("express");
const router = express.Router();
const { addResults, adminLogin } = require("../controllers/adminController");
const { adminAuth } = require("../middlewares/auth");

// Admin login
router.post("/login", adminLogin);

// Add/update results (protected)
router.post("/results/add", adminAuth, addResults);

module.exports = router;
