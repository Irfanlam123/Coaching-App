const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    enum: [
      "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
      "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
      "Class 11", "Class 12"
    ],
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("TimeTable", timeTableSchema);
