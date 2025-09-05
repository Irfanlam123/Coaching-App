import { useState } from "react";

export default function UploadMaterials() {
  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Study material uploaded successfully ✅");
    setFormData({ class: "", subject: "", file: null });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Upload Study Materials
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Class Selection */}
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

        {/* Subject */}
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter Subject"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* File Upload */}
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-900 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
