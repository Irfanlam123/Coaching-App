// pages/StudyMaterials.jsx
import React, { useState } from 'react';
import { FaDownload, FaFilter, FaGraduationCap, FaBook } from 'react-icons/fa';

const StudyMaterials = () => {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  
  // Sample data - in a real app, this would come from an API
  const materials = [
    { id: 1, class: 'Class 1', subject: 'Mathematics', pdfUrl: '#', description: 'Basic arithmetic and number concepts', chapters: 12 },
    { id: 2, class: 'Class 2', subject: 'English', pdfUrl: '#', description: 'Alphabet, basic reading and writing skills', chapters: 10 },
    { id: 3, class: 'Class 3', subject: 'Mathematics', pdfUrl: '#', description: 'Addition, subtraction and simple multiplication', chapters: 15 },
    { id: 4, class: 'Class 4', subject: 'English', pdfUrl: '#', description: 'Grammar, sentence structure and vocabulary', chapters: 14 },
    { id: 5, class: 'Class 5', subject: 'Mathematics', pdfUrl: '#', description: 'Multiplication, division and fractions', chapters: 16 },
    { id: 6, class: 'Class 6', subject: 'Science', pdfUrl: '#', description: 'Introduction to plants, animals and environment', chapters: 13 },
    { id: 7, class: 'Class 7', subject: 'Mathematics', pdfUrl: '#', description: 'Advanced arithmetic and geometry basics', chapters: 18 },
    { id: 8, class: 'Class 8', subject: 'Social Studies', pdfUrl: '#', description: 'Our country, culture and history', chapters: 11 },
    { id: 9, class: 'Class 9', subject: 'Mathematics', pdfUrl: '#', description: 'Fractions, decimals and basic algebra', chapters: 20 },
    { id: 10, class: 'Class 10', subject: 'Science', pdfUrl: '#', description: 'Human body, energy and simple machines', chapters: 16 },
    { id: 11, class: 'Class 11', subject: 'English', pdfUrl: '#', description: 'Advanced grammar and composition', chapters: 15 },
    { id: 12, class: 'Class 12', subject: 'Social Studies', pdfUrl: '#', description: 'World geography and civilizations', chapters: 14 },
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
