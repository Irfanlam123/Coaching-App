// controllers/studyController.js
const StudyMaterial = require("../models/study");
const path = require("path");

// ✅ Upload Material
exports.uploadMaterial = async (req, res) => {
  try {
    const { className, subject, materialName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required!" });
    }

    const newMaterial = new StudyMaterial({
      className,
      subject,
      materialName,
      pdfFile: req.file.filename, // multer se filename aayega
    });

    await newMaterial.save();

    res.status(201).json({ message: "Material uploaded successfully", data: newMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ uploadedAt: -1 });
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Material
exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await StudyMaterial.findByIdAndDelete(id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
