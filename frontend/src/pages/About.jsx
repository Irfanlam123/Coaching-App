import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaLightbulb, 
  FaRocket, 
  FaHeart, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaAward,
  FaProjectDiagram,
  FaRegSmile,
  FaHandshake,
  FaUsers,
  FaBrain
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Contact from './Contact';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const stats = [
    { icon: <FaAward className="text-2xl text-red-500" />, number: "150+", label: "Projects Completed" },
    { icon: <FaUser className="text-2xl text-orange-400" />, number: "100+", label: "Happy Students" },
    { icon: <FaProjectDiagram className="text-2xl text-blue-500" />, number: "5+", label: "Years Experience" },
    { icon: <FaHeart className="text-2xl text-red-600" />, number: "99%", label: "Students Satisfaction" }
  ];

  const values = [
    { icon: <FaHeart className="text-2xl text-green-700" />, title: "Passion", desc: "We love what we do and it shows in every project we deliver." },
    { icon: <FaLightbulb className="text-2xl text-red-600" />, title: "Innovation", desc: "We constantly explore new ideas and technologies to stay ahead." },
    { icon: <FaRocket className="text-2xl text-orange-500" />, title: "Excellence", desc: "We strive for perfection in every detail of our work." },
    { icon: <FaHandshake className="text-2xl text-blue-500" />, title: "Collaboration", desc: "We believe in working together to achieve extraordinary results." },
    { icon: <FaUsers className="text-2xl text-purple-500" />, title: "Community", desc: "We're committed to nurturing and growing our community." },
    { icon: <FaBrain className="text-2xl text-teal-500" />, title: "Creativity", desc: "We approach every challenge with fresh thinking and imagination." }
  ];

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className={`max-w-7xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-100 rounded-full opacity-50 animate-pulse delay-300"></div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl relative z-10">
            About <span className="text-[#043D3B]">Us</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
            We are a passionate team dedicated to creating amazing digital experiences.
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-12 h-1 bg-[#043D3B] rounded-full"></div>
            <div className="w-6 h-1 bg-[#043D3B] rounded-full"></div>
            <div className="w-3 h-1 bg-[#043D3B] rounded-full"></div>
          </div>
        </motion.div>

        {/* Mission and Vision */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 mb-20 items-center"
        >
          {/* Mission Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 hover:shadow-2xl duration-300 transition-all border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-50 rounded-full"></div>
            <div className="flex items-center mb-6 justify-center">
              <div className="p-3 bg-[#043D3B]/10 rounded-full mr-4">
                <FaLightbulb className="text-2xl text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg text-center">
              To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value in an ever-evolving digital landscape.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 hover:shadow-2xl duration-300 transition-all border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-50 rounded-full"></div>
            <div className="flex items-center mb-6 justify-center">
              <div className="p-3 bg-[#043D3B]/10 rounded-full mr-4">
                <FaRocket className="text-2xl text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg text-center">
              To be the leading force in digital innovation, setting new standards for excellence and creativity while fostering a culture of continuous learning and improvement.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#043D3B] to-teal-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="flex justify-center mb-4 relative z-10">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-[#043D3B]/10 transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 relative z-10">{stat.number}</h3>
              <p className="text-gray-600 relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#043D3B] to-teal-700 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          
          <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
            Our <span className="text-green-200">Core Values</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/15 transition-all duration-300 border border-white/10"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-white/90">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      

        <Contact />
      </div>
    </div>
  );
};

export default About;