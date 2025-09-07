const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    enum: ["1","2","3","4","5","6","7","8","9","10","11","12"],
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
    type: String, // saved file name
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
