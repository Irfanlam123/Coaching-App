import React, { useState, useEffect } from 'react';
import { FaDownload, FaFilter, FaGraduationCap, FaBook, FaSearch, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const StudyMaterials = () => {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Fetch materials from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8080/api/materials');
        setMaterials(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setError('Failed to load materials. Please try again later.');
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  // Get unique classes for the dropdown
  const classes = ['All Classes', ...new Set(materials.map((material) => `Class ${material.className}`))];

  // Filtered materials
  const filteredMaterials = materials.filter(material => {
    const matchesClass = selectedClass === 'All Classes' || `Class ${material.className}` === selectedClass;
    const matchesSearch = material.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Download PDF
  const handleDownload = (fileName) => {
    const url = `http://localhost:8080/uploads/${fileName}`;
    window.open(url, '_blank');
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-2xl shadow p-6 h-64 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-[#043D3B]/5 to-[#043D3B]/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#043D3B]/10 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#043D3B]/10 rounded-full opacity-50 animate-pulse delay-300"></div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4 relative z-10">
            Study <span className="text-[#043D3B]">Materials</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 relative z-10">
            Access comprehensive study resources for all classes and subjects
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-12 h-1 bg-[#043D3B] rounded-full"></div>
            <div className="w-6 h-1 bg-[#043D3B] rounded-full"></div>
            <div className="w-3 h-1 bg-[#043D3B] rounded-full"></div>
          </div>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="p-3 bg-[#043D3B]/10 rounded-full mr-4">
                <FaFilter className="text-xl text-[#043D3B]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Filter Materials</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
                />
              </div>
              
              {/* Class Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full md:w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] appearance-none transition-all duration-300"
                >
                  {classes.map((classOption, index) => (
                    <option key={index} value={classOption}>{classOption}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-6 flex justify-between items-center"
        >
          <p className="text-gray-700">
            Showing <span className="font-semibold text-[#043D3B]">{filteredMaterials.length}</span>
            {filteredMaterials.length === 1 ? ' resource' : ' resources'}
            {selectedClass !== 'All Classes' && ` for ${selectedClass}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Materials Grid */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <AnimatePresence>
            {filteredMaterials.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredMaterials.map((material) => (
                  <motion.div
                    key={material._id}
                    variants={itemVariants}
                    layout
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-[#043D3B]/10 rounded-full">
                          <FaBook className="text-xl text-[#043D3B]" />
                        </div>
                        <span className="px-3 py-1 bg-[#043D3B]/10 text-[#043D3B] text-sm font-medium rounded-full">
                          Class {material.className}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#043D3B] transition-colors duration-300">
                        {material.materialName}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600 flex items-center">
                          <span className="font-medium mr-2">Subject:</span>
                          {material.subject}
                        </p>
                        
                        <p className="text-gray-500 text-sm flex items-center">
                          <FaClock className="mr-2" />
                          Uploaded: {new Date(material.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDownload(material.pdfFile)}
                      className="mt-4 bg-gradient-to-r from-[#043D3B] to-teal-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300 group-hover:from-teal-700 group-hover:to-[#043D3B]"
                    >
                      <FaDownload /> 
                      <span>Download PDF</span>
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <div className="w-24 h-24 bg-[#043D3B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBook className="text-4xl text-[#043D3B]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No materials found</h3>
                <p className="text-gray-600">
                  {searchQuery || selectedClass !== 'All Classes' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No study materials available at the moment'
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;