const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadTimeTable, getAllTimeTables, getTimeTableByClass } = require("../controllers/timeTableController");

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("timetableImage"), uploadTimeTable); // upload image
router.get("/", getAllTimeTables); // get all timetables
router.get("/:className", getTimeTableByClass); // get timetable by class

module.exports = router;
