import React, { useState } from 'react';
import { FaUserGraduate, FaUser, FaPhone, FaEnvelope, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const Services = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    parentName: '',
    email: '',
    phone: '',
    previousSchool: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { class: selectedClass, ...formData });
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setSelectedClass('');
      setFormData({
        name: '',
        parentName: '',
        email: '',
        phone: '',
        previousSchool: ''
      });
    }, 3000);
  };

  const classCards = [
    {
      id: 1,
      title: 'Primary School (Classes 1-5)',
      description: 'Foundational education with focus on basic literacy, numeracy, and social skills.',
      features: ['Age-appropriate curriculum', 'Interactive learning', 'Creative activities', 'Basic computer skills']
    },
    {
      id: 2,
      title: 'Middle School (Classes 6-8)',
      description: 'Building strong fundamentals in core subjects with introduction to advanced concepts.',
      features: ['Subject specialist teachers', 'Science laboratory', 'Math enrichment', 'Language options']
    },
    {
      id: 3,
      title: 'High School (Classes 9-10)',
      description: 'Preparation for board examinations with comprehensive subject knowledge.',
      features: ['Board exam preparation', 'Career counseling', 'Advanced science labs', 'Competitive exam guidance']
    },
    {
      id: 4,
      title: 'Senior Secondary (Classes 11-12)',
      description: 'Specialized streams with focus on career preparation and higher education.',
      features: ['Science, Commerce & Arts streams', 'University preparation', 'Internship opportunities', 'Career guidance']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B]/10 to-[#043D3B]/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            School <span className="text-[#043D3B]">Admissions</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600">
            Begin your educational journey with us. Secure your child's future today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Admission Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admission Application</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-4xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">We'll contact you shortly with further details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Class
                  </label>
                  <select
                    id="class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B]"
                    required
                  >
                    <option value="">Select a class</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i+1} value={i+1}>Class {i+1}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Student's Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserGraduate className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B]"
                      placeholder="Enter student's full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Parent's Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B]"
                      placeholder="Enter parent's full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B]"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B]"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 mb-1">
                    Previous School (if any)
                  </label>
                  <input
                    type="text"
                    id="previousSchool"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B]"
                    placeholder="Enter previous school name"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#043D3B] text-white py-3 px-4 rounded-lg hover:bg-[#032d2b] transition-colors duration-300 flex items-center justify-center"
                >
                  Submit Application
                  <FaArrowRight className="ml-2" />
                </button>
              </form>
            )}
          </div>

          {/* Class Information Cards */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Academic Programs</h2>
            <div className="space-y-6">
              {classCards.map((card) => (
                <div 
                  key={card.id} 
                  className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-[#043D3B] mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <ul className="space-y-2">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-5 h-5 bg-[#043D3B]/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-[#043D3B] rounded-full"></div>
                          </div>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 bg-[#043D3B] rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {['Application','Assessment','Interaction','Confirmation'].map((step, i) => (
              <div key={i} className="text-center">
                <div className="bg-[#032d2b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{i+1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-200">
                  {i === 0 && 'Fill out the admission form with required details'}
                  {i === 1 && 'Student assessment (if applicable for the class)'}
                  {i === 2 && 'Meeting with school authorities and parents'}
                  {i === 3 && 'Receive admission confirmation and complete enrollment'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
