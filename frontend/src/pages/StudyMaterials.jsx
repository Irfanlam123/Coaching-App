// pages/StudyMaterials.jsx
import React, { useState } from 'react';
import { FaDownload, FaFilter, FaGraduationCap, FaBook } from 'react-icons/fa';

const StudyMaterials = () => {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  
  // Sample data - in a real app, this would come from an API
  const materials = [
    { id: 1, class: 'Class 1', subject: 'Mathematics', pdfUrl: '#', description: 'Basic arithmetic and number concepts', chapters: 12 },
    { id: 2, class: 'Class 1', subject: 'English', pdfUrl: '#', description: 'Alphabet, basic reading and writing skills', chapters: 10 },
    { id: 3, class: 'Class 2', subject: 'Mathematics', pdfUrl: '#', description: 'Addition, subtraction and simple multiplication', chapters: 15 },
    { id: 4, class: 'Class 2', subject: 'English', pdfUrl: '#', description: 'Grammar, sentence structure and vocabulary', chapters: 14 },
    { id: 5, class: 'Class 3', subject: 'Mathematics', pdfUrl: '#', description: 'Multiplication, division and fractions', chapters: 16 },
    { id: 6, class: 'Class 3', subject: 'Science', pdfUrl: '#', description: 'Introduction to plants, animals and environment', chapters: 13 },
    { id: 7, class: 'Class 4', subject: 'Mathematics', pdfUrl: '#', description: 'Advanced arithmetic and geometry basics', chapters: 18 },
    { id: 8, class: 'Class 4', subject: 'Social Studies', pdfUrl: '#', description: 'Our country, culture and history', chapters: 11 },
    { id: 9, class: 'Class 5', subject: 'Mathematics', pdfUrl: '#', description: 'Fractions, decimals and basic algebra', chapters: 20 },
    { id: 10, class: 'Class 5', subject: 'Science', pdfUrl: '#', description: 'Human body, energy and simple machines', chapters: 16 },
    { id: 11, class: 'Class 5', subject: 'English', pdfUrl: '#', description: 'Advanced grammar and composition', chapters: 15 },
    { id: 12, class: 'Class 5', subject: 'Social Studies', pdfUrl: '#', description: 'World geography and civilizations', chapters: 14 },
  ];

  // Get unique classes for the dropdown
  const classes = ['All Classes', ...new Set(materials.map(material => material.class))];
  
  // Filter materials based on selected class
  const filteredMaterials = selectedClass === 'All Classes' 
    ? materials 
    : materials.filter(material => material.class === selectedClass);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B]/5 to-[#043D3B]/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
            Study <span className="text-[#043D3B]">Materials</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Access comprehensive study resources for all classes and subjects
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="p-3 bg-[#043D3B]/10 rounded-full mr-4">
                <FaFilter className="text-xl text-[#043D3B]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Filter Materials</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full md:w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] appearance-none"
                >
                  {classes.map((classOption, index) => (
                    <option key={index} value={classOption}>{classOption}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGraduationCap className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700">
            Showing <span className="font-semibold">{filteredMaterials.length}</span> 
            {filteredMaterials.length === 1 ? ' resource' : ' resources'}
            {selectedClass !== 'All Classes' && ` for ${selectedClass}`}
          </p>
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div 
                key={material.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-[#043D3B]/10 text-[#043D3B] text-sm font-medium rounded-full">
                      {material.class}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#043D3B]/10 flex items-center justify-center">
                      <FaBook className="text-[#043D3B]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{material.subject}</h3>
                  <p className="text-gray-600 mb-4">{material.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-5">
                    <span>{material.chapters} chapters</span>
                  </div>
                  
                  <a 
                    href={material.pdfUrl} 
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#043D3B] hover:bg-[#032E2C] transition-colors duration-300"
                  >
                    <FaDownload className="mr-2" />
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#043D3B]/10 flex items-center justify-center">
              <FaBook className="text-4xl text-[#043D3B]" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No study materials found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are no study materials available for the selected class yet. Please check back later.
            </p>
          </div>
        )}

        {/* Additional Info Section */}
        <div className="mt-16 bg-[#043D3B] rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">How to Use Study Materials Effectively</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#032E2C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-[#CFE8E7]">Download the PDF materials for your class and subject</p>
            </div>
            <div className="text-center">
              <div className="bg-[#032E2C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Study</h3>
              <p className="text-[#CFE8E7]">Follow the structured chapters and practice regularly</p>
            </div>
            <div className="text-center">
              <div className="bg-[#032E2C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excel</h3>
              <p className="text-[#CFE8E7]">Track your progress and improve your performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;
