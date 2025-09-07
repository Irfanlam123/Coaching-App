import { useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaBook, FaChartLine, FaAward, FaPlusCircle, FaSpinner } from "react-icons/fa";

export default function AddResults() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    className: "",
    score: "",
    totalMarks: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear status when user starts typing
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/results/add",
        { results: [formData] }
      );

      setSubmitStatus({ 
        type: "success", 
        message: "✅ Result added successfully!",
        details: `Score: ${formData.score}/${formData.totalMarks} for Class ${formData.className}`
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
      const errorMessage = err.response?.data?.message || "Error adding result. Please try again.";
      setSubmitStatus({ 
        type: "error", 
        message: "❌ " + errorMessage
      });
      console.error("Error adding result:", err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate percentage if both score and total marks are provided
  const percentage = formData.score && formData.totalMarks 
    ? ((parseFloat(formData.score) / parseFloat(formData.totalMarks)) * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-30 animate-float animation-delay-2000"></div>
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-4 shadow-lg">
            <FaAward className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Add <span className="text-blue-600">Student Results</span>
          </h1>
          <p className="text-lg text-gray-600">
            Enter student examination results and track academic performance
          </p>
        </div>

        {/* Results Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Email */}
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300"
                required
              />
            </div>

            {/* Class Selection */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBook className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 appearance-none"
                required
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            {/* Score and Total Marks - Side by side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score */}
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300"
                  required
                />
              </div>

              {/* Total Marks */}
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Percentage Display */}
            {percentage && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 font-medium text-center">
                  Percentage: <span className="font-bold">{percentage}%</span>
                  {percentage >= 80 && " 🎉 Excellent!"}
                  {percentage >= 60 && percentage < 80 && " 👍 Good!"}
                  {percentage >= 40 && percentage < 60 && " ✔️ Average"}
                  {percentage < 40 && " ❌ Needs Improvement"}
                </p>
              </div>
            )}

            {/* Status Message */}
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <p className="font-medium">{submitStatus.message}</p>
                {submitStatus.details && (
                  <p className="text-sm mt-1">{submitStatus.details}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
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

        {/* Additional Info */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Result Guidelines
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Ensure the student email is registered in the system</li>
            <li>• Double-check scores before submission</li>
            <li>• Results cannot be edited once submitted</li>
            <li>• Students will receive automatic notifications</li>
          </ul>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}