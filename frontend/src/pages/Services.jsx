import React, { useState } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaCheckCircle,
  FaBook,
  FaSchool,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Services = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    email: "",
    phone: "",
    previousSchool: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/services/submit", {
        selectedClass,
        ...formData,
      });

      console.log("✅ Data submitted:", res.data);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setSelectedClass("");
        setFormData({
          name: "",
          parentName: "",
          email: "",
          phone: "",
          previousSchool: "",
        });
        setIsLoading(false);
      }, 3000);
    } catch (err) {
      console.error("❌ Error while submitting:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-[#043D3B] to-[#0A5C59] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 text-white"
        >
          <h1 className="text-4xl font-bold mb-4">
            School Admission Form
          </h1>
          <p className="max-w-2xl mx-auto opacity-90">
            Begin your educational journey with us. Fill out the form below to apply for admission.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="w-12 h-1 bg-white rounded-full"></div>
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-3 h-1 bg-white rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaUserGraduate className="text-[#0A5C59]" /> Student Information
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-4xl text-[#0A5C59]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600">
                  We'll contact you shortly with further details.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs */}
                {[
                  {
                    id: "name",
                    label: "Student's Full Name",
                    icon: <FaUserGraduate className="h-5 w-5 text-gray-400" />,
                    placeholder: "Enter student's full name",
                  },
                  {
                    id: "parentName",
                    label: "Parent's Name",
                    icon: <FaUser className="h-5 w-5 text-gray-400" />,
                    placeholder: "Enter parent's full name",
                  },
                  {
                    id: "email",
                    label: "Email Address",
                    type: "email",
                    icon: <FaEnvelope className="h-5 w-5 text-gray-400" />,
                    placeholder: "Enter your email address",
                  },
                  {
                    id: "phone",
                    label: "Phone Number",
                    type: "tel",
                    icon: <FaPhone className="h-5 w-5 text-gray-400" />,
                    placeholder: "Enter your phone number",
                  },
                  {
                    id: "previousSchool",
                    label: "Previous School (if any)",
                    icon: <FaSchool className="h-5 w-5 text-gray-400" />,
                    placeholder: "Enter previous school name",
                  },
                ].map((field) => (
                  <motion.div variants={itemVariants} key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {field.icon}
                      </div>
                      <input
                        type={field.type || "text"}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all duration-300"
                        placeholder={field.placeholder}
                        required={field.id !== "previousSchool"}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Class */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Class
                  </label>
                  <select
                    id="class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A5C59] focus:border-[#0A5C59] transition-all duration-300"
                    required
                  >
                    <option value="">Select a class</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Class {i + 1}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 font-medium p-3 bg-red-50 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center shadow-md disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      Submit Application
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaBook className="text-[#0A5C59]" /> Admission Process
            </h2>

            <div className="space-y-6">
              {[
                { step: 1, title: "Fill out the form", text: "Provide all required information accurately." },
                { step: 2, title: "Submit your application", text: "We'll review your information promptly." },
                { step: 3, title: "Receive confirmation", text: "We'll contact you within 2 business days." },
                { step: 4, title: "Complete enrollment", text: "Finalize the process with required documents." },
              ].map((s) => (
                <div className="flex items-start" key={s.step}>
                  <div className="bg-[#E6F5F4] text-[#0A5C59] rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{s.title}</h3>
                    <p className="text-gray-600 mt-1">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[#E6F5F4] rounded-lg border border-[#B2DFDB]">
              <h3 className="font-semibold text-[#043D3B] mb-2">Need assistance?</h3>
              <p className="text-[#0A5C59] text-sm">
                Contact our admission office at{" "}
                <span className="font-medium">viraamvaani1@gmail.com</span> or call{" "}
                <span className="font-medium">9304024338</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
