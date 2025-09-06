const Result = require("../models/Result");

// Admin adds multiple results
exports.addResults = async (req, res) => {
  try {
    const results = req.body.results; // array of results
    if (!results || results.length === 0)
      return res.status(400).json({ msg: "No results provided" });

    const savedResults = [];
    for (let r of results) {
      const existing = await Result.findOne({ studentEmail: r.studentEmail });
      if (existing) {
        // update existing result
        existing.className = r.className;
        existing.score = r.score;
        existing.percentage = r.percentage;
        existing.gpa = r.gpa;
        await existing.save();
        savedResults.push(existing);
      } else {
        const newResult = new Result(r);
        await newResult.save();
        savedResults.push(newResult);
      }
    }
    res.json({ msg: "Results added/updated", savedResults });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Admin login (hardcoded)
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  // hardcoded admin
  if (username === "admin123" && password === "admin123") {
    const token = jwt.sign({ username }, "adminSecret123", { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
};
