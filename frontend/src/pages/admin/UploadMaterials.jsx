import { useState } from "react";
import axios from "axios";
import { FaBook, FaGraduationCap, FaFilePdf, FaClock } from "react-icons/fa";

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

    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
      setUploadStatus(null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      setUploadStatus({ type: "error", message: "Please select a file!" });
      return;
    }
    if (!formData.alwaysAvailable && !formData.expiresAt) {
      setUploadStatus({
        type: "error",
        message: "Please select expiry date & time OR mark Always Available",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const data = new FormData();
      data.append("className", formData.className);
      data.append("subject", formData.subject);
      data.append("materialName", formData.materialName);
      data.append("pdfFile", formData.file); // ✅ must match backend "pdfFile"

      if (formData.alwaysAvailable) {
        data.append("expiresAt", "null");
      } else {
        data.append("expiresAt", formData.expiresAt);
      }

      const res = await axios.post(
        "https://coaching-app-1rmb.onrender.com/api/materials/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUploadStatus({
        type: "success",
        message: res.data.message || "Study material uploaded successfully ✅",
      });

      console.log(res.data);

      setFormData({
        className: "",
        subject: "",
        materialName: "",
        expiresAt: "",
        alwaysAvailable: false,
        file: null,
      });
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(err);
      setUploadStatus({
        type: "error",
        message: err.response?.data?.message || "Upload failed! Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Class */}
            <div className="relative">
              <FaGraduationCap className="absolute left-3 top-3 text-gray-400" />
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Class</option>
                {[...Array(12).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    Class {num + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="relative">
              <FaBook className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter Subject"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Material Name */}
            <div className="relative">
              <span className="absolute left-3 top-3">📚</span>
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                placeholder="Enter Material Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Expiry / Always Available */}
            <div className="space-y-3">
              <div className="relative">
                <FaClock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="datetime-local"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleChange}
                  disabled={formData.alwaysAvailable}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="alwaysAvailable"
                  checked={formData.alwaysAvailable}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span>Always Available (No Expiry)</span>
              </label>
            </div>

            {/* File Upload */}
            <div className="relative">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-[#043D3B] hover:bg-gray-100">
                <FaFilePdf className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload PDF</p>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  required
                />
              </label>
              {formData.file && (
                <div className="mt-2 text-sm text-green-600">
                  ✅ {formData.file.name}
                </div>
              )}
            </div>

            {/* Status */}
            {uploadStatus && (
              <div
                className={`p-4 rounded-lg ${
                  uploadStatus.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {uploadStatus.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-[#043D3B] text-white py-3 rounded-lg"
            >
              {isUploading ? "Uploading..." : "Upload Material"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
