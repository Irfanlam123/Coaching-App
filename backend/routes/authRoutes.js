const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// User Signup
router.post("/signup", signup);

// User Login
router.post("/login", login);

module.exports = router;
