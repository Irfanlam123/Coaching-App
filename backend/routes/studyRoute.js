const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  uploadMaterial,
  getMaterials,
  downloadMaterial,
} = require("../controllers/studyController");

// Multer storage setup
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
router.post("/upload", upload.single("pdfFile"), uploadMaterial);
router.get("/", getMaterials);
router.get("/download/:id", downloadMaterial);

module.exports = router;
