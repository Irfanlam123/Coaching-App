import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetInfo = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://coaching-app-41n5.onrender.com/api/services');
        setServices(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching data');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-medium text-lg">Loading submissions...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white rounded-lg hover:opacity-90 transition-all shadow-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Student Submissions</h1>
          <p className="text-white/80 max-w-2xl mx-auto">View all student registration submissions in an organized and beautiful interface</p>
        </div>

        {services.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#043D3B] to-[#0A5C59] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">No submissions yet</h3>
            <p className="text-gray-600">When students submit registration forms, they'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {services.map((service, index) => (
              <div 
                key={service._id} 
                className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${expandedCard === service._id ? 'border-[#0A5C59]' : 'border-[#043D3B]/30'} transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#043D3B]/10 to-[#0A5C59]/10 rounded-bl-full"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-4/5">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{service.name}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white text-sm font-medium px-3 py-1 rounded-full">
                        {service.selectedClass}
                      </span>
                      <span className="text-gray-600 font-medium">• {service.parentName}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleExpand(service._id)}
                    className="text-[#0A5C59] hover:text-[#043D3B] transition-colors p-2 rounded-full hover:bg-[#043D3B]/10"
                  >
                    {expandedCard === service._id ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </div>
                
                <div className={`grid gap-4 overflow-hidden transition-all duration-500 ${expandedCard === service._id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                      <div>
                        <h3 className="text-sm font-semibold text-[#043D3B] uppercase tracking-wider mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact Information
                        </h3>
                        <div className="space-y-2">
                          <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0A5C59] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Email:</span> 
                            <span className="ml-1 text-gray-700">{service.email}</span>
                          </p>
                          <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0A5C59] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="font-medium">Phone:</span> 
                            <span className="ml-1 text-gray-700">{service.phone}</span>
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#043D3B] uppercase tracking-wider mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v8" />
                          </svg>
                          Education
                        </h3>
                        <p className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0A5C59] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-8 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium">Previous School:</span> 
                          <span className="ml-1 text-gray-700">{service.previousSchool || 'N/A'}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-6 pt-3 border-t border-gray-100 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Submitted on: {new Date(service.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInfo;