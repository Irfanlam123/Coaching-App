const express = require("express");
const router = express.Router();
const {
  addResult,
  getAllResults,
  getStudentResults,
} = require("../controllers/resultController");
const { adminAuth } = require("../middlewares/auth"); // admin middleware

// Admin adds result
router.post("/add", adminAuth, addResult);

// Get all results (admin)
router.get("/all", adminAuth, getAllResults);

// Get results of a specific student (admin)
router.get("/:studentEmail", adminAuth, getStudentResults);

module.exports = router;
