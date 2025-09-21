const StudyMaterial = require("../models/study");
const drive = require("../utils/googleDrive");
const fs = require("fs");

// Google Drive folder ID
const FOLDER_ID = "1WkIzT_rPHlqTtv-m9bzITCvd2Le2sPFt";

// ✅ Upload Material
exports.uploadMaterial = async (req, res) => {
  try {
    const { className, subject, materialName, expiresAt } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required!" });
    }

    let expiryDate = null;
    if (expiresAt && expiresAt !== "null") {
      expiryDate = new Date(expiresAt);
      if (isNaN(expiryDate)) {
        return res.status(400).json({ message: "Invalid expiry date!" });
      }
    }

    // Upload file to Google Drive
    const fileMetadata = {
      name: req.file.originalname,
      parents: [FOLDER_ID],
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, webViewLink, webContentLink",
    });

    // Make file public
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Direct download link
    const fileLink = `https://drive.google.com/uc?id=${response.data.id}&export=download`;

    // Save in MongoDB
    const newMaterial = new StudyMaterial({
      className,
      subject,
      materialName,
      pdfFile: fileLink,
      expiresAt: expiryDate,
    });

    await newMaterial.save();

    // Delete temp local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: expiryDate
        ? `Material uploaded successfully. It will auto-delete at ${expiryDate.toLocaleString()}.`
        : "Material uploaded successfully. (Permanent file, will never auto-delete)",
      data: newMaterial,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get All Materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ uploadedAt: -1 });
    res.json(materials);
  } catch (error) {
    console.error("Get Error:", error);
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

    // Delete from Google Drive
    const fileIdMatch = material.pdfFile.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      await drive.files.delete({ fileId: fileIdMatch[1] });
    }

    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
