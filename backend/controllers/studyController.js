const { Readable } = require("stream");
const StudyMaterial = require("../models/study");
const drive = require("../utils/googleDrive");

// Google Drive folder ID
const FOLDER_ID = "1WkIzT_rPHlqTtv-m9bzITCvd2Le2sPFt";

// ✅ Upload Material
exports.uploadMaterial = async (req, res) => {
  try {
    const { className, subject, materialName, expiresAt } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "File is required!" });

    let expiryDate = null;
    if (expiresAt && expiresAt !== "null") {
      expiryDate = new Date(expiresAt);
      if (isNaN(expiryDate))
        return res.status(400).json({ message: "Invalid expiry date!" });
    }

    // Convert Buffer to Stream
    const fileMetadata = { name: req.file.originalname, parents: [FOLDER_ID] };
    const media = { mimeType: req.file.mimetype, body: Readable.from(req.file.buffer) };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
    });

    // Make file public
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: { role: "reader", type: "anyone" },
    });

    const fileLink = `https://drive.google.com/uc?id=${response.data.id}&export=download`;

    const newMaterial = new StudyMaterial({
      className,
      subject,
      materialName,
      pdfFile: fileLink,
      expiresAt: expiryDate,
    });

    await newMaterial.save();

    res.status(201).json({
      message: expiryDate
        ? `Material uploaded successfully. It will auto-delete at ${expiryDate.toLocaleString()}.`
        : "Material uploaded successfully. (Permanent file)",
      data: newMaterial,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ uploadedAt: -1 });
    res.json({ data: materials });
  } catch (error) {
    console.error("Get Materials Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete material by ID
exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await StudyMaterial.findByIdAndDelete(id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    // Delete from Google Drive
    const fileId = material.pdfFile.split("id=")[1].split("&")[0];
    await drive.files.delete({ fileId });

    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Delete Material Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
