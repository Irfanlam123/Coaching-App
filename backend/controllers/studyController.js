const { Readable } = require("stream");
const StudyMaterial = require("../models/study");
const drive = require("../utils/googleDrive");

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
      if (isNaN(expiryDate.getTime())) {
        return res.status(400).json({ message: "Invalid expiry date!" });
      }
    }

    // Convert Buffer to Stream
    const fileMetadata = {
      name: `${Date.now()}_${req.file.originalname}`,
      parents: [FOLDER_ID]
    };
    
    const media = {
      mimeType: req.file.mimetype,
      body: Readable.from(req.file.buffer)
    };

    // Upload to Google Drive
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id"
    });

    const fileId = response.data.id;

    // Make file public
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone"
      }
    });

    // Generate direct download link
    const fileLink = `https://drive.google.com/uc?id=${fileId}&export=download`;

    // Save to database
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

// ✅ Get all materials (filter out expired ones)
exports.getMaterials = async (req, res) => {
  try {
    const now = new Date();
    const materials = await StudyMaterial.find({
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: now } }
      ]
    }).sort({ uploadedAt: -1 });
    
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
    const material = await StudyMaterial.findById(id);
    
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Extract file ID from Google Drive URL
    const url = new URL(material.pdfFile);
    const searchParams = new URLSearchParams(url.search);
    const fileId = searchParams.get("id");
    
    if (fileId) {
      try {
        // Delete from Google Drive
        await drive.files.delete({ fileId });
      } catch (driveError) {
        console.error("Error deleting from Google Drive:", driveError);
        // Continue with database deletion even if Drive deletion fails
      }
    }

    // Delete from MongoDB
    await StudyMaterial.findByIdAndDelete(id);

    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Delete Material Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Background cleanup function (call this periodically)
exports.cleanupExpiredMaterials = async () => {
  try {
    const now = new Date();
    const expiredMaterials = await StudyMaterial.find({
      expiresAt: { $ne: null, $lt: now }
    });

    for (let material of expiredMaterials) {
      try {
        // Extract file ID from Google Drive URL
        const url = new URL(material.pdfFile);
        const searchParams = new URLSearchParams(url.search);
        const fileId = searchParams.get("id");
        
        if (fileId) {
          // Delete from Google Drive
          await drive.files.delete({ fileId });
        }
      } catch (driveError) {
        console.error("Error deleting file from Google Drive:", driveError);
      }
      
      // Delete from MongoDB
      await StudyMaterial.findByIdAndDelete(material._id);
      console.log(`🗑 Deleted expired material: ${material.materialName}`);
    }
  } catch (error) {
    console.error("🛑 Cleanup job error:", error);
  }
};