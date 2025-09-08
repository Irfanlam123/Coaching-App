import { useState } from "react";
import axios from "axios";
import { FaUpload, FaBook, FaGraduationCap, FaFilePdf } from "react-icons/fa";

export default function UploadMaterials() {
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    materialName: "",
    file: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
      setUploadStatus(null); // Clear status when new file is selected
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      setUploadStatus({ type: "error", message: "Please select a file!" });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const data = new FormData();
      data.append("className", formData.className);
      data.append("subject", formData.subject);
      data.append("materialName", formData.materialName);
      data.append("pdfFile", formData.file);

      const res = await axios.post(
        "http://localhost:8080/api/materials/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus({ type: "success", message: "Study material uploaded successfully ✅" });
      console.log(res.data);
      
      // Reset form
      setFormData({ className: "", subject: "", materialName: "", file: null });
      
      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      
    } catch (err) {
      console.error(err);
      setUploadStatus({ type: "error", message: "Upload failed! Please try again." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwNDNEM0IiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNIDAgMCBMIDYwIDYwIE0gNjAgMCBMIDAgNjAiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-30 animate-float animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-teal-200 rounded-full opacity-25 animate-float animation-delay-3000"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#043D3B] to-teal-600 rounded-full mb-4 shadow-lg">
            <FaUpload className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Upload <span className="text-[#043D3B]">Study Materials</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share educational resources with students. Upload PDFs for any class and subject.
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Class Selection */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaGraduationCap className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300 appearance-none"
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
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBook className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter Subject (e.g., Mathematics, Science)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
                required
              />
            </div>

            {/* Material Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">📚</span>
              </div>
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                placeholder="Enter Material Name (e.g., Algebra Basics, Physics Formulas)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
                required
              />
            </div>

            {/* File Upload - Custom Styling */}
            <div className="relative">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#043D3B] transition-all duration-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaFilePdf className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX (MAX. 10MB)
                    </p>
                  </div>
                  <input 
                    id="file-upload" 
                    type="file" 
                    name="file" 
                    onChange={handleChange} 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    required 
                  />
                </label>
              </div>
              {formData.file && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 flex items-center">
                    <span className="mr-2">✓</span>
                    Selected: <strong className="ml-1">{formData.file.name}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Status Message */}
            {uploadStatus && (
              <div className={`p-4 rounded-lg ${
                uploadStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {uploadStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-[#043D3B] to-teal-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-700 hover:to-[#043D3B] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <FaUpload className="mr-2" />
                  Upload Material
                </>
              )}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-[#043D3B] rounded-full mr-2"></span>
            Upload Guidelines
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Maximum file size: 10MB</li>
            <li>• Supported formats: PDF, DOC, DOCX</li>
            <li>• Name your files clearly for easy identification</li>
            <li>• Ensure content is appropriate for the selected class level</li>
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
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}