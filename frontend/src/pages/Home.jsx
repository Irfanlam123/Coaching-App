// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "MD Adil",
    role: "Founder & CEO |Viraam Vaani|",
    image: "./src/assets/ceo.jpg",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Jaismin Ara",
    role: "Sponsor Team",
    image: "./src/assets/mam1.jpeg",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Amjad Ansari",
    role: "Developer",
    image: "./src/assets/amja.jpg",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
];

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#043D3B] opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-[#043D3B] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#043D3B] font-semibold text-lg mb-2 block">
              Our Advantages
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <div className="w-20 h-1 bg-[#043D3B] mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              We provide the perfect environment for academic excellence with
              our proven teaching methodology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#043D3B] bg-opacity-10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-orange-500 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#043D3B] transition-colors duration-300">
                Quality Study Materials
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive and well-structured study materials designed by
                experts for all classes and competitive exams.
              </p>
              <div className="mt-6">
                <span className="text-[#043D3B] font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="bg-white p-8  border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#043D3B] bg-opacity-10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#043D3B] transition-colors duration-300">
                Expert Faculty
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from experienced teachers and industry professionals
                dedicated to your academic success and growth.
              </p>
              <div className="mt-6">
                <span className="text-[#043D3B] font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                  Meet our team
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#043D3B] bg-opacity-10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#043D3B] transition-colors duration-300">
                Proven Results
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join our legacy of excellent academic achievements with a
                consistent track record of outstanding results.
              </p>
              <div className="mt-6">
                <span className="text-[#043D3B] font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                  See results
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 rounded-xl bg-[#043D3B] bg-opacity-5 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white bg-opacity-80"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[#043D3B] mb-2">500+</div>
              <div className="text-lg font-medium text-gray-700">
                Hours of Learning
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#043D3B] mb-2">95%</div>
              <div className="text-lg font-medium text-gray-700">
                Success Rate
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#043D3B] mb-2">5+</div>
              <div className="text-lg font-medium text-gray-700">
                Expert Faculty
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#043D3B] mb-2">5+</div>
              <div className="text-lg font-medium text-gray-700">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background image from Unsplash - Education theme */}
        <div
          className="absolute inset-0 w-full h-full rounded-md bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/4103247/pexels-photo-4103247.jpeg')",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0  bg-opacity-80"></div>
        </div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-10 md:p-16 max-w-5xl mx-auto border border-gray-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#043D3B] opacity-5"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#00FFCC] opacity-10"></div>

            <div className="text-center relative z-10">
              <span className="text-[#043D3B] font-semibold text-lg mb-2 block">
                Begin Your Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Excel in Your Studies?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                Join hundreds of successful students who have achieved their
                academic goals with our personalized guidance and proven
                teaching methodology.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                <Link
                  to="/services"
                  className="px-8 py-4 bg-[#043D3B] text-white font-medium rounded-lg hover:bg-[#032E2C] transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Apply for Admission
                </Link>
                <Link
                  to="/study-materials"
                  className="px-8 py-4 bg-white text-gray-900 border border-gray-200 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Study Materials
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                Limited seats available for the 2023-24 academic session
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* team section */}
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
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-[#043D3B] mb-3 text-sm">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-600 hover:text-[#043D3B] transition-colors duration-300"
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-600 hover:text-[#043D3B] transition-colors duration-300"
                  >
                    <FaTwitter className="text-lg" />
                  </a>
                  <a
                    href={member.social.github}
                    className="text-gray-600 hover:text-[#043D3B] transition-colors duration-300"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
