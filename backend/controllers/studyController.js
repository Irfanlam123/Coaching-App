const { Readable } = require("stream");
const StudyMaterial = require("../models/study");
const { uploadFile } = require("../utils/googleDrive");

// Upload Material
exports.uploadMaterial = async (req, res) => {
  try {
    const { className, subject, materialName, expiresAt } = req.body;

    if (!req.file) return res.status(400).json({ message: "File is required!" });

    let expiryDate = null;
    if (expiresAt && expiresAt !== "null") {
      expiryDate = new Date(expiresAt);
      if (isNaN(expiryDate.getTime())) {
        return res.status(400).json({ message: "Invalid expiry date!" });
      }
    }

    const timestamp = Date.now();
    const ext = req.file.originalname.split(".").pop();
    const fileName = `${timestamp}_${materialName.replace(/\s+/g, "_")}.${ext}`;

    // Convert buffer to stream
    const fileBuffer = Readable.from(req.file.buffer);

    const fileLink = await uploadFile(fileBuffer, fileName, req.file.mimetype);

    const newMaterial = await StudyMaterial.create({
      className,
      subject,
      materialName,
      pdfFile: fileLink,
      expiresAt: expiryDate,
    });

    res.status(201).json({
      message: expiryDate
        ? `Material uploaded successfully. It will auto-delete at ${expiryDate.toLocaleString()}.`
        : "Material uploaded successfully. (Permanent file)",
      material: newMaterial,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all materials
exports.getMaterials = async (req, res) => {
  try {
    const now = new Date();
    const materials = await StudyMaterial.find({
      $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
    }).sort({ uploadedAt: -1 });

    res.json({ data: materials });
  } catch (error) {
    console.error("Get Materials Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete material
exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await StudyMaterial.findById(id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    const fileId = new URLSearchParams(new URL(material.pdfFile).search).get("id");
    await drive.files.delete({ fileId });

    await StudyMaterial.findByIdAndDelete(id);
    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Delete Material Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Cleanup expired materials
exports.cleanupExpiredMaterials = async () => {
  try {
    const now = new Date();
    const expiredMaterials = await StudyMaterial.find({ expiresAt: { $ne: null, $lt: now } });

    for (let material of expiredMaterials) {
      const fileId = new URLSearchParams(new URL(material.pdfFile).search).get("id");
      await drive.files.delete({ fileId });
      await StudyMaterial.findByIdAndDelete(material._id);
      console.log(`🗑 Deleted expired material: ${material.materialName}`);
    }
  } catch (error) {
    console.error("🛑 Cleanup job error:", error);
  }
};
