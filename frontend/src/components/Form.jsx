import { useState } from "react";

export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "", class: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    setFormData({ name: "", class: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Admission Form</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter Name"
        className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <input
        type="text"
        name="class"
        value={formData.class}
        onChange={handleChange}
        placeholder="Enter Class"
        className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
      >
        Submit
      </button>
    </form>
  );
}
