const Result = require("../models/Result");

// Add a new result
exports.addResult = async (req, res) => {
  try {
    const { studentEmail, className, score, totalMarks } = req.body;

    if (!studentEmail || !className || score == null || totalMarks == null) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const percentage = ((score / totalMarks) * 100).toFixed(2);

    const newResult = new Result({
      studentEmail,
      className,
      score,
      totalMarks,
      percentage,
    });

    await newResult.save();

    res.status(201).json({
      success: true,
      message: "Result added successfully",
      result: newResult,
    });
  } catch (err) {
    console.error("Add Result Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all results (optional: admin view)
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json({ success: true, results });
  } catch (err) {
    console.error("Get Results Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get results of a specific student
exports.getStudentResults = async (req, res) => {
  try {
    const { studentEmail } = req.params;
    const results = await Result.find({ studentEmail }).sort({ createdAt: -1 });

    if (!results.length) {
      return res
        .status(404)
        .json({ success: false, message: "No results found for this student" });
    }

    res.json({ success: true, results });
  } catch (err) {
    console.error("Get Student Results Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
