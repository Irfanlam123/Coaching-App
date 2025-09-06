// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-slate-50 text-gray-900 py-16 md:py-24 overflow-hidden">
      {/* Background pattern with subtle animation */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            animation: "backgroundMove 20s linear infinite"
          }}
        ></div>
      </div>
      
      <style jsx>{`
        @keyframes backgroundMove {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 1000px; }
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading with improved typography */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Master Your Future with <span className="text-[#043D3B] relative">
              Expert Coaching
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400 transform scale-x-75"></span>
            </span>
          </h1>
          
          {/* Subtitle with better readability */}
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful students who achieved their dreams with our comprehensive 
            <span className="font-semibold text-[#043D3B]"> JEE and NEET coaching programs</span>. 
            Experience personalized learning with proven results.
          </p>
          
          {/* CTA buttons with improved styling */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link 
              to="/services" 
              className="px-8 py-4 bg-[#043D3B] text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-[#043D3B] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Explore Courses
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white border-2 border-[#043D3B] text-[#043D3B] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Learn More
            </Link>
          </div>
          
          {/* Stats Section with improved cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200 stat-card transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                95%
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <div className="text-lg font-medium text-gray-700">Success Rate</div>
              <p className="text-sm text-gray-500 mt-2">of our students achieve their target ranks</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 stat-card transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-lg font-medium text-gray-700">Students</div>
              <p className="text-sm text-gray-500 mt-2">trust us for their preparation journey</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 stat-card transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-lg font-medium text-gray-700">Years Experience</div>
              <p className="text-sm text-gray-500 mt-2">in mentoring future professionals</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-100 opacity-50"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-50"></div>
    </section>
  );
};

export default Hero;