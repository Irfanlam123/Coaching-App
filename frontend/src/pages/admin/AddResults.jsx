import { useState } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaBook,
  FaChartLine,
  FaAward,
  FaPlusCircle,
  FaSpinner,
} from "react-icons/fa";

export default function AddResults() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    className: "",
    score: "",
    totalMarks: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // ✅ Admin token from localStorage (after login)
  const adminToken = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!adminToken) {
      setSubmitStatus({
        type: "error",
        message: "❌ Admin not logged in. Please login first.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://coaching-app-akr2.onrender.com/api/admin/results/add",
        formData,
        {
          headers: {
            "x-auth-token": adminToken,
          },
        }
      );

      setSubmitStatus({
        type: "success",
        message: "✅ Result added successfully!",
        details: `Score: ${formData.score}/${formData.totalMarks} for Class ${formData.className}`,
      });

      console.log("Response:", res.data);

      // Reset form
      setFormData({
        studentEmail: "",
        className: "",
        score: "",
        totalMarks: "",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg || "Error adding result. Please try again.";
      setSubmitStatus({
        type: "error",
        message: "❌ " + errorMessage,
      });
      console.error("Error adding result:", err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-[#043D3B] to-[#0A5C59] py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Floating Circles */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-white/20 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/30 rounded-full opacity-30 animate-float animation-delay-2000"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#043D3B] to-[#0A5C59] rounded-full mb-4 shadow-lg">
            <FaAward className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Add <span className="text-yellow-300">Student Results</span>
          </h1>
          <p className="text-lg text-gray-200">
            Enter student examination results and track academic performance
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserGraduate className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                placeholder="student@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBook className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all duration-300 appearance-none"
                required
              >
                <option value="">Select Class</option>
                {[...Array(12).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    Class {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaChartLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  placeholder="Obtained Score"
                  min="0"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📊</span>
                </div>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  placeholder="Total Marks"
                  min="1"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all duration-300"
                  required
                />
              </div>
            </div>

            {submitStatus && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <p className="font-medium">{submitStatus.message}</p>
                {submitStatus.details && (
                  <p className="text-sm mt-1">{submitStatus.details}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#05514F] hover:to-[#0C6F6B] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Adding Result...
                </>
              ) : (
                <>
                  <FaPlusCircle className="mr-2" />
                  Add Result
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
