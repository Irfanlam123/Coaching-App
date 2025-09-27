// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import vid from "../assets/backvi.mp4"
const Hero = () => {
  return (
    <section className="relative bg-slate-50 rounded-md py-6 text-gray-900 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/gif,AAAA"
        >
          <source 
            src= {vid}  
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>  
      </div>

      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-12 md:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white">
            Master Your Future with{" "}
            <span className="text-[#00FFCC] relative inline-block">
              Expert Guidance
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-[#00FFCC] transform scale-x-75"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Viraam Vaani is a trusted platform where learning goes beyond
            textbooks. With expert teachers, personal care, and innovative
            methods, we nurture young minds — helping students excel in studies
            and grow with confidence for life.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16 px-2 sm:px-0">
            <Link
              to="/services"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-[#043D3B] text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-[#043D3B] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Explore Courses
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white border-2 border-[#043D3B] text-[#043D3B] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#043D3B] mb-1 sm:mb-2">95%</div>
              <div className="text-base sm:text-lg font-medium text-gray-700">
                Success Rate
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                of our students achieve their goals
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#043D3B] mb-1 sm:mb-2">500+</div>
              <div className="text-base sm:text-lg font-medium text-gray-700">Students</div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                trust us for their learning journey
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#043D3B] mb-1 sm:mb-2">5+</div>
              <div className="text-base sm:text-lg font-medium text-gray-700">
                Years Experience
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                in nurturing young minds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;