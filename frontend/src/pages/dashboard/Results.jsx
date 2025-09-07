import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  FaTrophy, 
  FaBook, 
  FaAward, 
  FaPrint,
  FaDownload,
  FaShare,
  FaStar
} from "react-icons/fa";

const Results = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      setError("Please login to view your results");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/admin/results/${userEmail}`
        );
        setResult(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching result:", err);
        setError("No results found. Please contact your teacher.");
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "from-emerald-500 to-green-600", icon: "👑", label: "Exceptional" };
    if (percentage >= 80) return { grade: "A", color: "from-green-500 to-emerald-600", icon: "🏆", label: "Excellent" };
    if (percentage >= 70) return { grade: "B+", color: "from-blue-500 to-cyan-600", icon: "⭐", label: "Very Good" };
    if (percentage >= 60) return { grade: "B", color: "from-cyan-500 to-blue-600", icon: "🎯", label: "Good" };
    if (percentage >= 50) return { grade: "C", color: "from-yellow-500 to-amber-600", icon: "📘", label: "Average" };
    if (percentage >= 40) return { grade: "D", color: "from-orange-500 to-amber-600", icon: "📙", label: "Below Average" };
    return { grade: "F", color: "from-red-500 to-rose-600", icon: "📕", label: "Needs Attention" };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="h-auto bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-3 border-blue-500 border-t-transparent mx-auto mb-3"
          />
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Loading Results</h2>
          <p className="text-gray-600 text-xs">Preparing your report...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-auto bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center py-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl shadow-md p-4 max-w-xs w-full text-center border border-gray-100"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">📝</span>
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-1">Results Unavailable</h2>
          <p className="text-gray-600 text-xs mb-3">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!result) return null;

  const percentage = result.percentage || ((result.score / result.totalMarks) * 100).toFixed(1);
  const gradeInfo = getGrade(percentage);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-100 py-4 px-3">
      <div className="max-w-xs mx-auto">
        {/* Header Section - Made smaller */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-md mb-2"
          >
            <FaTrophy className="text-lg text-white" />
          </motion.div>
          <h1 className="text-xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Results
          </h1>
        </motion.div>

        {/* Main Results Card - Made much more compact */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          {/* Grade Banner - Compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`bg-gradient-to-r ${gradeInfo.color} text-white p-3 text-center`}
          >
            <div className="text-2xl font-bold">{percentage}%</div>
            <div className="text-sm font-semibold flex items-center justify-center mt-1">
              <span className="mr-1">{gradeInfo.icon}</span>
              {gradeInfo.grade} - {gradeInfo.label}
            </div>
          </motion.div>

          {/* Content Section - Compact */}
          <div className="p-3">
            {/* Score Cards - Made smaller */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-2 mb-4"
            >
              <motion.div variants={itemVariants} className="bg-blue-50 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-blue-700">{result.score}</div>
                <p className="text-[10px] text-blue-600 font-medium">Score</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-indigo-50 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-indigo-700">{result.totalMarks}</div>
                <p className="text-[10px] text-indigo-600 font-medium">Total</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-emerald-50 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-emerald-700">{percentage}%</div>
                <p className="text-[10px] text-emerald-600 font-medium">Percent</p>
              </motion.div>
            </motion.div>

            {/* Progress Bar - Compact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                <span>Performance</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`bg-gradient-to-r ${gradeInfo.color} h-1.5 rounded-full`}
                />
              </div>
            </motion.div>

            {/* Class Information Only - Removed name and email */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-4"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <FaBook className="text-green-600 text-xs" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500">Class</p>
                  <p className="text-sm font-semibold text-gray-900">Class {result.className}</p>
                </div>
              </motion.div>

              {/* GPA if available */}
              {result.gpa && (
                <motion.div variants={itemVariants} className="flex items-center justify-center mt-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                    <FaAward className="text-purple-600 text-xs" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500">GPA</p>
                    <p className="text-sm font-semibold text-gray-900">{result.gpa}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Achievement Badge - Compact */}
            {percentage >= 70 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200 rounded-lg p-2 text-center mb-3"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full mb-1">
                  <FaStar className="text-amber-600 text-xs" />
                </div>
                <h4 className="text-xs font-bold text-amber-800">Excellent!</h4>
                <p className="text-[10px] text-amber-700">
                  Great job!
                </p>
              </motion.div>
            )}
          </div>

          {/* Action Footer - Compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 p-2 border-t border-gray-100"
          >
            <div className="flex justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.print()}
                className="flex items-center justify-center bg-white text-blue-600 border border-blue-200 px-2 py-1 rounded-lg text-[10px] font-medium"
              >
                <FaPrint className="mr-1 text-[10px]" />
                Print
              </motion.button>
            
            </div>
          </motion.div>
        </motion.div>

        {/* Motivational Quote - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-4"
        >
        
        </motion.div>
      </div>
    </div>
  );
};

export default Results;