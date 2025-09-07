// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-slate-50 rounded-md text-gray-900 overflow-hidden">
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
            src=".\src\assets\backvi.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-background-1027-large.mp4" type="video/mp4" />
         */}
         {/* <source src="" type="video/mp4" /> */}
      </div>

      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Master Your Future with{" "}
            <span className="text-[#00FFCC] relative">
              Expert Guidance
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00FFCC] transform scale-x-75"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Viraam Vaani is a trusted platform where learning goes beyond
            textbooks. With expert teachers, personal care, and innovative
            methods, we nurture young minds — helping students excel in studies
            and grow with confidence for life.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/services"
              className="px-8 py-4 bg-[#043D3B] text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-[#043D3B] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Explore Courses
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 bg-white border-2 border-[#043D3B] text-[#043D3B] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Learn More
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <div className="text-4xl font-bold text-[#043D3B] mb-2">95%</div>
              <div className="text-lg font-medium text-gray-700">
                Success Rate
              </div>
              <p className="text-sm text-gray-500 mt-2">
                of our students achieve their goals
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <div className="text-4xl font-bold text-[#043D3B] mb-2">500+</div>
              <div className="text-lg font-medium text-gray-700">Students</div>
              <p className="text-sm text-gray-500 mt-2">
                trust us for their learning journey
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <div className="text-4xl font-bold text-[#043D3B] mb-2">5+</div>
              <div className="text-lg font-medium text-gray-700">
                Years Experience
              </div>
              <p className="text-sm text-gray-500 mt-2">
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