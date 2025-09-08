const TimeTable = require("../models/timetable");

// Upload timetable
const uploadTimeTable = async (req, res) => {
  try {
    const { className } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newTimeTable = new TimeTable({
      className,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newTimeTable.save();
    res.status(201).json({ message: "TimeTable uploaded successfully", newTimeTable });
  } catch (error) {
    res.status(500).json({ message: "Error uploading timetable", error });
  }
};

// Get all timetables
const getAllTimeTables = async (req, res) => {
  try {
    const timeTables = await TimeTable.find();
    res.status(200).json(timeTables);
  } catch (error) {
    res.status(500).json({ message: "Error fetching timetables", error });
  }
};

// Get timetable by class
const getTimeTableByClass = async (req, res) => {
  try {
    const { className } = req.params;
    const timetable = await TimeTable.findOne({ className });

    if (!timetable) {
      return res.status(404).json({ message: "No timetable found for this class" });
    }

    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Error fetching timetable", error });
  }
};

module.exports = {
  uploadTimeTable,
  getAllTimeTables,
  getTimeTableByClass,
};
