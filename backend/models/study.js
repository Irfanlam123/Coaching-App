// models/StudyMaterial.js
const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  materialName: {
    type: String,
    required: true,
  },
  pdfFile: {
    type: String, // file ka path store karenge
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
