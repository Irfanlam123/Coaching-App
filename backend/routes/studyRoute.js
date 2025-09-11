const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadMaterial, getMaterials, deleteMaterial } = require("../controllers/studyController");

const router = express.Router();

// ✅ Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// ✅ Routes
router.post("/upload", upload.single("pdfFile"), uploadMaterial);
router.get("/", getMaterials);
router.delete("/:id", deleteMaterial);

module.exports = router;
