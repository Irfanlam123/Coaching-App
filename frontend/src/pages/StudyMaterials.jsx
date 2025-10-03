import React, { useState, useEffect } from "react";
import { FaDownload, FaBook, FaGraduationCap, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/study");
        setMaterials(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching materials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleOpen = (fileUrl) => {
    window.open(fileUrl, "_blank"); // Open in new tab
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-[#043D3B]/5 to-[#043D3B]/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Study Materials</h1>

        {loading ? <p>Loading materials...</p> : (
          <AnimatePresence>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((m) => (
                <motion.div key={m._id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-100">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <FaBook className="text-xl text-[#043D3B]" />
                      <span className="px-3 py-1 bg-[#043D3B]/10 text-[#043D3B] text-sm font-medium rounded-full">Class {m.className}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{m.materialName}</h3>
                    <p className="text-gray-600 mb-2"><strong>Subject:</strong> {m.subject}</p>
                    <p className="text-gray-500 text-sm flex items-center"><FaClock className="mr-2" />Uploaded: {new Date(m.uploadedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleDownload(m.pdfFile, m.materialName)} className="flex-1 bg-[#043D3B] text-white py-2 rounded-lg flex justify-center items-center gap-2">
                      <FaDownload /> Download
                    </button>
                    <button onClick={() => handleOpen(m.pdfFile)} className="flex-1 bg-gray-700 text-white py-2 rounded-lg flex justify-center items-center gap-2">
                      Open PDF
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;
