import { useState } from "react";

export default function AddResults() {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    marks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Result added successfully ✅");
    setFormData({ name: "", class: "", marks: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-4">Add Student Result</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Student Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Student Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Class */}
        <select
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        >
          <option value="">Select Class</option>
          {[...Array(12).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              Class {num + 1}
            </option>
          ))}
        </select>

        {/* Marks */}
        <input
          type="number"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          placeholder="Enter Marks"
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
