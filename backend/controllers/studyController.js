const StudyMaterial = require("../models/studymatterial");
const path = require("path");
const fs = require("fs");

// Upload study material
exports.uploadMaterial = async (req, res) => {
  try {
    const { className, subject, materialName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const newMaterial = new StudyMaterial({
      className,
      subject,
      materialName,
      pdfFile: req.file.filename,
    });

    await newMaterial.save();
    res.status(201).json({ message: "Study material uploaded successfully", material: newMaterial });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ uploadedAt: -1 });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Download material
exports.downloadMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await StudyMaterial.findById(id);

    if (!material) return res.status(404).json({ message: "Material not found" });

    const filePath = path.join(__dirname, "../uploads", material.pdfFile);

    if (fs.existsSync(filePath)) {
      res.download(filePath, material.pdfFile);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
