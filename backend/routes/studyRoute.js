const express = require("express");
const multer = require("multer");
const { uploadMaterial, getMaterials, deleteMaterial } = require("../controllers/studyController");

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Routes
router.post("/upload", upload.single("pdfFile"), uploadMaterial);
router.get("/", getMaterials);
router.delete("/:id", deleteMaterial);

module.exports = router;
