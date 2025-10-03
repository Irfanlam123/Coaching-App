import { useState } from "react";
import axios from "axios";
import { FaBook, FaGraduationCap, FaFilePdf, FaClock, FaUpload, FaCheckCircle } from "react-icons/fa";

export default function UploadMaterials() {
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    materialName: "",
    expiresAt: "",
    alwaysAvailable: false,
    file: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked, expiresAt: "" });
      return;
    }
    if (name === "file") setFormData({ ...formData, file: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) return setUploadStatus({ type: "error", message: "Please select a file!" });
    if (!formData.alwaysAvailable && !formData.expiresAt)
      return setUploadStatus({ type: "error", message: "Select expiry date or mark Always Available" });

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("className", formData.className);
      data.append("subject", formData.subject);
      data.append("materialName", formData.materialName);
      data.append("file", formData.file);
      data.append("expiresAt", formData.alwaysAvailable ? "null" : formData.expiresAt);

      const res = await axios.post("http://localhost:8080/api/study/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus({ type: "success", message: res.data.message });
      setFormData({ className: "", subject: "", materialName: "", expiresAt: "", alwaysAvailable: false, file: null });
      document.querySelector('input[type="file"]').value = "";
    } catch (err) {
      setUploadStatus({ type: "error", message: err.response?.data?.message || "Upload failed!" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-3">Upload Study Materials</h1>
          <p className="text-teal-100 text-sm sm:text-base lg:text-lg">Share educational resources with students</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Class Selection */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Class</label>
              <div className="relative">
                <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <select 
                  name="className" 
                  value={formData.className} 
                  onChange={handleChange} 
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all text-sm sm:text-base"
                  required
                >
                  <option value="">Select Class</option>
                  {[...Array(12).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>Class {num + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Subject</label>
              <div className="relative">
                <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Enter Subject Name" 
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all text-sm sm:text-base"
                  required 
                />
              </div>
            </div>

            {/* Material Name */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Material Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm sm:text-base">📚</span>
                <input 
                  type="text" 
                  name="materialName" 
                  value={formData.materialName} 
                  onChange={handleChange} 
                  placeholder="Enter Material Name" 
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all text-sm sm:text-base"
                  required 
                />
              </div>
            </div>

            {/* Expiry / Always Available */}
            <div className="space-y-3 sm:space-y-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Availability Settings</label>
              
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input 
                  type="datetime-local" 
                  name="expiresAt" 
                  value={formData.expiresAt} 
                  onChange={handleChange} 
                  disabled={formData.alwaysAvailable} 
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all text-sm sm:text-base ${
                    formData.alwaysAvailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                  }`}
                />
              </div>
              
              <label className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <input 
                  type="checkbox" 
                  name="alwaysAvailable" 
                  checked={formData.alwaysAvailable} 
                  onChange={handleChange} 
                  className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A5C59] focus:ring-[#0A5C59] rounded" 
                />
                <span className="text-sm sm:text-base text-gray-700 font-medium">Always Available (No Expiry)</span>
              </label>
            </div>

            {/* File Upload */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Upload PDF File</label>
              <label className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl cursor-pointer bg-gray-50 hover:border-[#043D3B] hover:bg-gray-100 transition-all duration-300 group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaFilePdf className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-1 sm:mb-2 group-hover:text-[#043D3B] transition-colors" />
                  <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                    <span className="font-semibold text-[#043D3B]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF files only</p>
                </div>
                <input 
                  type="file" 
                  name="file" 
                  onChange={handleChange} 
                  className="hidden" 
                  accept=".pdf" 
                  required 
                />
              </label>
              
              {formData.file && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500 text-sm sm:text-base" />
                  <span className="text-green-700 text-sm sm:text-base font-medium truncate">{formData.file.name}</span>
                  <span className="text-green-600 text-xs">({(formData.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>

            {/* Status Message */}
            {uploadStatus && (
              <div className={`p-3 sm:p-4 rounded-lg border ${
                uploadStatus.type === "success" 
                  ? "bg-green-50 text-green-700 border-green-200" 
                  : "bg-red-50 text-red-700 border-red-200"
              }`}>
                <div className="flex items-center space-x-2">
                  {uploadStatus.type === "success" ? (
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  )}
                  <span className="text-sm sm:text-base">{uploadStatus.message}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-[#032826] hover:to-[#084b48] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm sm:text-base">Uploading...</span>
                </>
              ) : (
                <>
                  <FaUpload className="text-sm sm:text-base" />
                  <span className="text-sm sm:text-base">Upload Material</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}