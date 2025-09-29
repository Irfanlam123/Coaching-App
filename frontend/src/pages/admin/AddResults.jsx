import { useState } from "react";
import axios from "axios";

export default function AddResults() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    className: "",
    score: "",
    totalMarks: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminToken = localStorage.getItem("adminToken"); // Must be set after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminToken) {
      setSubmitStatus({ type: "error", message: "Admin not logged in" });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      studentEmail: formData.studentEmail.trim(),
      className: formData.className,
      score: Number(formData.score),
      totalMarks: Number(formData.totalMarks),
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/results/add",
        payload,
        {
          headers: {
            "x-auth-token": adminToken,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitStatus({ type: "success", message: res.data.msg });
      setFormData({ studentEmail: "", className: "", score: "", totalMarks: "" });
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: err.response?.data?.msg || err.message,
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Student Result</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Student Email</label>
          <input
            type="email"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Class Name</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Score</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Total Marks</label>
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-md text-white ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Result"}
        </button>
      </form>

      {submitStatus && (
        <p
          className={`mt-4 text-center font-medium ${
            submitStatus.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {submitStatus.message}
        </p>
      )}
    </div>
  );
}
