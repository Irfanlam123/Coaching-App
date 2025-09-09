import React, { useState } from "react";

const AddSchedule = () => {
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    testDate: "",
    testTime: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/notifications", {
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
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Server error, please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Test Schedule</h2>

      {message && <p className="mb-4 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Class */}
        <div>
          <label className="block text-sm font-medium">Class</label>
          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium">Test Date</label>
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium">Test Time</label>
          <input
            type="time"
            name="testTime"
            value={formData.testTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Schedule
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;
