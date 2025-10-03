import React, { useState } from "react";

// ✅ API Base URL (env me rakho, fallback localhost hoga)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const AddSchedule = () => {
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    testDate: "",
    testTime: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Schedule added successfully!");
        setFormData({
          className: "",
          subject: "",
          testDate: "",
          testTime: "",
          description: "",
        });
      } else {
        setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Add schedule error:", error);
      setMessage("❌ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#043D3B] to-[#0A5C59] px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#043D3B] mb-2">
          📅 Add Test Schedule
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Fill the form below to add a new test schedule
        </p>

        {/* Message */}
        {message && (
          <p
            className={`mb-4 text-sm text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Class */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
              Class
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all"
              required
            >
              <option value="">-- Select Class --</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={`Class ${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
                Test Date
              </label>
              <input
                type="date"
                name="testDate"
                value={formData.testDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
                Test Time
              </label>
              <input
                type="time"
                name="testTime"
                value={formData.testTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-3.5 rounded-lg font-semibold text-white bg-gradient-to-r from-[#043D3B] to-[#0A5C59] hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg text-sm sm:text-base"
          >
            {loading ? "Submitting..." : "Add Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
