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
  FaProjectDiagram
} from 'react-icons/fa';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Maria Garcia",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "James Wilson",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      social: { linkedin: "#", twitter: "#", github: "#" }
    }
  ];

  // Stats data
  const stats = [
    { icon: <FaAward className="text-2xl" />, number: "150+", label: "Projects Completed" },
    { icon: <FaUser className="text-2xl" />, number: "50+", label: "Happy Clients" },
    { icon: <FaProjectDiagram className="text-2xl" />, number: "5+", label: "Years Experience" },
    { icon: <FaHeart className="text-2xl" />, number: "99%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className={`max-w-7xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About <span className="text-indigo-600">Us</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            We are a passionate team dedicated to creating amazing digital experiences.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-full mr-4">
                <FaLightbulb className="text-2xl text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg">
              To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value in an ever-evolving digital landscape.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-full mr-4">
                <FaRocket className="text-2xl text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg">
              To be the leading force in digital innovation, setting new standards for excellence and creativity while fostering a culture of continuous learning and improvement.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center text-indigo-600 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our <span className="text-indigo-600">Team</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                      <FaTwitter className="text-xl" />
                    </a>
                    <a href={member.social.github} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                      <FaGithub className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Our <span className="text-indigo-200">Values</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-indigo-100">We love what we do and it shows in every project we deliver.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-indigo-100">We constantly explore new ideas and technologies to stay ahead.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-indigo-100">We strive for perfection in every detail of our work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;