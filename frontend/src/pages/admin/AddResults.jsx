import { useState } from "react";
import axios from "axios";

export default function AddResults() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    className: "",
    score: "",
    totalMarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend expects "results" as an array
      const res = await axios.post(
        "http://localhost:8080/api/admin/results/add",
        { results: [formData] }
      );

      alert("✅ Result added successfully!");
      console.log("Response:", res.data);

      // Reset form
      setFormData({
        studentEmail: "",
        className: "",
        score: "",
        totalMarks: "",
      });
    } catch (err) {
      console.error("Error adding result:", err.response?.data || err.message);
      alert("❌ Error adding result. Check console.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Add Student Result
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Email */}
        <input
          type="email"
          name="studentEmail"
          value={formData.studentEmail}
          onChange={handleChange}
          placeholder="Enter Student Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Class Name */}
        <input
          type="text"
          name="className"
          value={formData.className}
          onChange={handleChange}
          placeholder="Enter Class (e.g., 10th)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Score */}
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          placeholder="Enter Score"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Total Marks */}
        <input
          type="number"
          name="totalMarks"
          value={formData.totalMarks}
          onChange={handleChange}
          placeholder="Enter Total Marks"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-900 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Add Result
        </button>
      </form>
    </div>
  );
}
