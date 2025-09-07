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
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {

      name: "MD Adil",
      role: "Founder & CEO |Viraam Vaani|",
      image: "./src/assets/ceo.jpg",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Jaismin Ara",
      role: "Team Leader ",
      image: "",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Amjad Ansari",
      role: "Developer",
      image: "./src/assets/amja.jpg",
      social: { linkedin: "#", twitter: "#", github: "#" }
    }
  ];

  const stats = [
    { icon: <FaAward className="text-2xl text-red-500" />, number: "150+", label: "Projects Completed" },
    { icon: <FaUser className="text-2xl text-orange-400" />, number: "100+", label: "Happy Students" },
    { icon: <FaProjectDiagram className="text-2xl text-blue-500" />, number: "5+", label: "Years Experience" },
    { icon: <FaHeart className="text-2xl text-red-600" />, number: "99%", label: "Students Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-7xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl ">
            About <span className="text-[#043D3B]">Us</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            We are a passionate team dedicated to creating amazing digital experiences.
          </p>
        </div>

        {/* Mission and Vision */}
<div className="grid md:grid-cols-2 gap-6 mb-20 items-center">
  {/* Left: Mission Text */}
  <div className="bg-white  p-8 hover:shadow-2xl duration-300">
    <div className="flex items-center mb-6 py-10 justify-center">
      <div className="p-3 bg-[#043D3B]/10 rounded-full mr-4">
        <FaLightbulb className="text-2xl text-red-700" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900  justify-center">Our Mission</h2>
    </div>
    <p className="text-gray-600 text-lg text-center ">
      To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value in an ever-evolving digital landscape.
    </p>
  </div>

  {/* Right: Mission Image */}
  <div className="flex justify-center   ">
    <img 
      src="./src/assets/about.jpg" 
      alt="Mission" 
      className="rounded-2xl  shadow-xl object-cover w-full h-full max-h-[300px]" 
    />
  </div>
</div>

{/* Vision Section */}
<div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
  {/* Left: Vision Image */}
  <div className="flex justify-center order-2 md:order-1">
    <img 
      src="./src/assets/vision.jpeg" 
      alt="Vision" 
      className="rounded-2xl shadow-xl object-cover w-full h-full max-h-[300px]" 
    />
  </div>

  {/* Right: Vision Text */}
  <div className="bg-white hover:shadow-2xl duration-300 py-7">
    <div className="flex items-center  py-11  justify-center mb-6 ">
      <div className="p-3 bg-[#043D3B]/10 rounded-full mr-4  ">
        <FaRocket className="text-2xl text-orange-500 " />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
    </div>
    <p className="text-gray-600 text-lg text-center">
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
              <div className="flex justify-center text-[#043D3B] mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
{/* Team Section */}
<div className="mb-20">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
    Our <span className="text-[#043D3B]">Team</span>
  </h2>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {teamMembers.map((member, index) => (
      <div 
        key={index} 
        className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center p-6"
      >
        {/* Circular Image */}
        <div className="w-40 h-40 mb-4">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
          <p className="text-[#043D3B] mb-3 text-sm">{member.role}</p>
          <div className="flex justify-center space-x-4">
            <a href={member.social.linkedin} className="text-gray-600 hover:text-[#043D3B] transition-colors duration-300">
              <FaLinkedin className="text-lg" />
            </a>
            <a href={member.social.twitter} className="text-gray-600 hover:text-[#043D3B] transition-colors duration-300">
              <FaTwitter className="text-lg" />
            </a>
            <a href={member.social.github} className="text-gray-600 hover:text-[#043D3B] transition-colors duration-300">
              <FaGithub className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



        {/* Values Section */}
        <div className="bg-[#043D3B] rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-green-200">Values</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#eaf2f2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-white">We love what we do and it shows in every project we deliver.</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-2xl text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-white">We constantly explore new ideas and technologies to stay ahead.</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-white">We strive for perfection in every detail of our work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
