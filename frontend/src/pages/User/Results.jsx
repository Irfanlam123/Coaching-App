import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { 
  FaTrophy, 
  FaBook, 
  FaAward, 
  FaPrint,
  FaStar,
  FaMedal,
  FaGraduationCap,
  FaChartLine
} from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";

const Results = () => {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [celebrate, setCelebrate] = useState(false);

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
          `https://coaching-app-1rmb.onrender.com/api/admin/results/${userEmail}`
        );
        setResult(res.data);
        setLoading(false);
        
        // Trigger celebration for good grades
        const percentage = res.data.percentage || ((res.data.score / res.data.totalMarks) * 100).toFixed(1);
        if (percentage >= 70) {
          setCelebrate(true);
          setTimeout(() => setCelebrate(false), 3000);
        }
      } catch (err) {
        console.error("Error fetching result:", err);
        setError("No results found. Please contact your teacher.");
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "from-emerald-500 to-green-600", icon: "👑", label: "Exceptional", bgColor: "bg-gradient-to-r from-emerald-500 to-green-600" };
    if (percentage >= 80) return { grade: "A", color: "from-green-500 to-emerald-600", icon: "🏆", label: "Excellent", bgColor: "bg-gradient-to-r from-green-500 to-emerald-600" };
    if (percentage >= 70) return { grade: "B+", color: "from-blue-500 to-cyan-600", icon: "⭐", label: "Very Good", bgColor: "bg-gradient-to-r from-blue-500 to-cyan-600" };
    if (percentage >= 60) return { grade: "B", color: "from-cyan-500 to-blue-600", icon: "🎯", label: "Good", bgColor: "bg-gradient-to-r from-cyan-500 to-blue-600" };
    if (percentage >= 50) return { grade: "C", color: "from-yellow-500 to-amber-600", icon: "📘", label: "Average", bgColor: "bg-gradient-to-r from-yellow-500 to-amber-600" };
    if (percentage >= 40) return { grade: "D", color: "from-orange-500 to-amber-600", icon: "📙", label: "Below Average", bgColor: "bg-gradient-to-r from-orange-500 to-amber-600" };
    return { grade: "F", color: "from-red-500 to-rose-600", icon: "📕", label: "Needs Attention", bgColor: "bg-gradient-to-r from-red-500 to-rose-600" };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const floatingVariants = {
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} 
            className="rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Results</h2>
          <p className="text-gray-600 text-sm">We're preparing your academic report...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 max-w-xs w-full text-center border border-gray-100"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Results Unavailable</h2>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <motion.button 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.98 }} 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
      
      {/* Celebration confetti */}
      {celebrate && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`
              }}
              initial={{ y: -10, opacity: 0 }}
              animate={{ 
                y: [0, 100], 
                opacity: [1, 0],
                x: Math.random() * 50 - 25
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 2,
                delay: Math.random() * 0.5
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto relative z-10">
        {/* Welcome User Name */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-center text-gray-800"
        >
          Welcome, {user?.name}!
        </motion.h1>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }} 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg mb-3 relative"
          >
            <FaTrophy className="text-2xl text-white" />
            <motion.div 
              variants={floatingVariants}
              animate="float"
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs"
            >
              👑
            </motion.div>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Academic Results
          </h1>
          <p className="text-sm text-gray-600">Your performance summary</p>
        </motion.div>

        {/* Main Results Card */}
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 backdrop-blur-sm"
        >
          {/* Grade Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className={`bg-gradient-to-r ${gradeInfo.color} text-white p-5 text-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyNSIvPjwvZz48L3N2Zz4=')]"></div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-4xl font-bold mb-1 drop-shadow-md"
            >
              {percentage}%
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-semibold flex items-center justify-center mt-2"
            >
              <span className="text-2xl mr-2">{gradeInfo.icon}</span>
              {gradeInfo.grade} - {gradeInfo.label}
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10"
            ></motion.div>
          </motion.div>

          <div className="p-5">
            {/* Stats Grid */}
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              className="grid grid-cols-3 gap-3 mb-5"
            >
              <motion.div 
                variants={itemVariants} 
                className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaChartLine className="text-blue-600 text-sm" />
                </div>
                <div className="text-xl font-bold text-blue-700">{result.score}</div>
                <p className="text-xs text-blue-600 font-medium">Score</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="bg-indigo-50 rounded-xl p-3 text-center border border-indigo-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaGraduationCap className="text-indigo-600 text-sm" />
                </div>
                <div className="text-xl font-bold text-indigo-700">{result.totalMarks}</div>
                <p className="text-xs text-indigo-600 font-medium">Total</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaMedal className="text-emerald-600 text-sm" />
                </div>
                <div className="text-xl font-bold text-emerald-700">{percentage}%</div>
                <p className="text-xs text-emerald-600 font-medium">Percent</p>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }} 
              className="mb-5"
            >
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Performance Level</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${percentage}%` }} 
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} 
                  className={`bg-gradient-to-r ${gradeInfo.color} h-2.5 rounded-full relative`}
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -right-1.5 -top-1.5 w-4 h-4 rounded-full bg-white border-2 border-current"
                  ></motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              className="mb-5"
            >
              <motion.div 
                variants={itemVariants} 
                className="flex items-center bg-gray-50 rounded-xl p-3 mb-2 border border-gray-100"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <FaBook className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Class</p>
                  <p className="text-sm font-semibold text-gray-900">Class {result.className}</p>
                </div>
              </motion.div>

              {result.gpa && (
                <motion.div 
                  variants={itemVariants} 
                  className="flex items-center bg-gray-50 rounded-xl p-3 border border-gray-100"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <FaAward className="text-purple-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">GPA</p>
                    <p className="text-sm font-semibold text-gray-900">{result.gpa}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Encouragement Message */}
            {percentage >= 70 ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ delay: 0.5 }} 
                className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200 rounded-xl p-4 text-center mb-4 relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-200 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-amber-200 rounded-full opacity-20"></div>
                
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-2 relative z-10">
                  <FaStar className="text-amber-600 text-lg" />
                </div>
                <h4 className="text-sm font-bold text-amber-800 mb-1 relative z-10">Excellent Performance!</h4>
                <p className="text-xs text-amber-700 relative z-10">You're among the top performers!</p>
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-amber-200 rounded-full"
                ></motion.div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ delay: 0.5 }} 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-center mb-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                  <IoIosRocket className="text-blue-600 text-lg" />
                </div>
                <h4 className="text-sm font-bold text-blue-800 mb-1">Keep Improving!</h4>
                <p className="text-xs text-blue-700">You're on the right track to success!</p>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.7 }} 
            className="bg-gray-50 p-4 border-t border-gray-100"
          >
            <div className="flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }} 
                whileTap={{ scale: 0.98 }} 
                onClick={() => window.print()} 
                className="flex items-center justify-center bg-white text-blue-600 border border-blue-200 px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm"
              >
                <FaPrint className="mr-2 text-sm" />
                Print Results
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-6 text-xs text-gray-500"
        >
          <p>© {new Date().getFullYear()} Academic Results System</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;