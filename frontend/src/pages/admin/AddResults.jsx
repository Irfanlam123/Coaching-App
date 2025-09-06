import { useState } from "react";
import axios from "axios";

export default function AddResults() {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    className: "",
    score: "",
    percentage: "",
    gpa: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to backend
      const res = await axios.post(
        "http://localhost:8080/api/results/add",
        formData
      );

      alert("✅ Result added successfully!");
      console.log("Response:", res.data);

      // Reset form
      setFormData({
        studentName: "",
        email: "",
        className: "",
        score: "",
        percentage: "",
        gpa: "",
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
        {/* Student Name */}
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Enter Student Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Class Name */}
        <input
          type="text"
          name="className"
          value={formData.className}
          onChange={handleChange}
          placeholder="Enter Class (e.g., MCA)"
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

        {/* Percentage */}
        <input
          type="number"
          step="0.01"
          name="percentage"
          value={formData.percentage}
          onChange={handleChange}
          placeholder="Enter Percentage"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* GPA */}
        <input
          type="number"
          step="0.01"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          placeholder="Enter GPA"
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
