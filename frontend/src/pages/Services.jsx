import React, { useState } from 'react';
import { 
  FaUserGraduate, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaArrowRight, 
  FaCheckCircle,
  FaBook,
  FaGraduationCap,
  FaFlask,
  FaChartLine
} from 'react-icons/fa';
import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const classCards = [
    {
      id: 1,
      title: 'Primary School (Classes 1-5)',
      description: 'Foundational education with focus on basic literacy, numeracy, and social skills.',
      features: ['Age-appropriate curriculum', 'Interactive learning', 'Creative activities', 'Basic computer skills'],
      icon: <FaBook className="text-2xl" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Middle School (Classes 6-8)',
      description: 'Building strong fundamentals in core subjects with introduction to advanced concepts.',
      features: ['Subject specialist teachers', 'Science laboratory', 'Math enrichment', 'Language options'],
      icon: <FaFlask className="text-2xl" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'High School (Classes 9-10)',
      description: 'Preparation for board examinations with comprehensive subject knowledge.',
      features: ['Board exam preparation', 'Career counseling', 'Advanced science labs', 'Competitive exam guidance'],
      icon: <FaGraduationCap className="text-2xl" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Senior Secondary (Classes 11-12)',
      description: 'Specialized streams with focus on career preparation and higher education.',
      features: ['Science, Commerce & Arts streams', 'University preparation', 'Internship opportunities', 'Career guidance'],
      icon: <FaChartLine className="text-2xl" />,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B]/10 to-[#043D3B]/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#043D3B]/10 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#043D3B]/10 rounded-full opacity-50 animate-pulse delay-300"></div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl relative z-10">
            School <span className="text-[#043D3B]">Admissions</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600">
            Begin your educational journey with us. Secure your child's future today.
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-12 h-1 bg-[#043D3B] rounded-full"></div>
            <div className="w-6 h-1 bg-[#043D3B] rounded-full"></div>
            <div className="w-3 h-1 bg-[#043D3B] rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Admission Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#043D3B]/10 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admission Application</h2>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-4xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">We'll contact you shortly with further details.</p>
              </motion.div>
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
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
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
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
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
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
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
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
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#043D3B] focus:border-[#043D3B] transition-all duration-300"
                    placeholder="Enter previous school name"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#043D3B] to-teal-700 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center shadow-md"
                >
                  Submit Application
                  <FaArrowRight className="ml-2" />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Class Information Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Academic Programs</h2>
            <div className="space-y-6">
              {classCards.map((card) => (
                <motion.div 
                  key={card.id} 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer border border-gray-100 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#043D3B] to-teal-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="flex items-start mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${card.color} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#043D3B] group-hover:text-teal-700 transition-colors duration-300">{card.title}</h3>
                      <p className="text-gray-600 mt-1">{card.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-16">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-5 h-5 bg-[#043D3B]/10 rounded-full flex items-center justify-center mr-2 mt-0.5 group-hover:bg-teal-100 transition-colors duration-300">
                            <div className="w-1.5 h-1.5 bg-[#043D3B] rounded-full group-hover:bg-teal-700 transition-colors duration-300"></div>
                          </div>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Information Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#1c5250] to-teal-700 rounded-2xl shadow-xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          
          <h2 className="text-3xl font-bold text-center mb-8 relative z-10">Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {['Application','Assessment','Interaction','Confirmation'].map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-all duration-300 border border-white/10"
              >
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{i+1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-200">
                  {i === 0 && 'Fill out the admission form with required details'}
                  {i === 1 && 'Student assessment (if applicable for the class)'}
                  {i === 2 && 'Meeting with school authorities and parents'}
                  {i === 3 && 'Receive admission confirmation and complete enrollment'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;