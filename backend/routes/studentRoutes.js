const express = require("express");
const router = express.Router();
const { signup, login, getMyResult } = require("../controllers/studentController");
const { studentAuth } = require("../middlewares/auth");

// Student signup/login
router.post("/signup", signup);
router.post("/login", login);



module.exports = router;
