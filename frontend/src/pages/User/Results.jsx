import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Results = () => {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      const email = user?.email || localStorage.getItem("userEmail");
      if (!email) {
        setError("Please login to view your results");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/api/results/student/${email}`);

        if (res.data.success) {
          setResult(res.data.result);
        } else {
          setError(res.data.message || "No results found");
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err.response?.data?.message || "Result not declared yet");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center w-full max-w-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base md:text-lg">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Unable to Load Results</h3>
          <p className="text-red-600 text-sm md:text-base mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 md:px-6 md:py-2 bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white rounded-lg hover:from-[#052E2C] hover:to-[#084B48] transition-all duration-200 text-sm md:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">No Results Available</h3>
          <p className="text-gray-600 text-sm md:text-base">Your results haven't been published yet.</p>
        </div>
      </div>
    );
  }

  const percentage = result.percentage;
  const isPass = percentage >= 40;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] py-4 md:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Academic Results</h1>
          <p className="text-teal-100 text-sm md:text-lg">View your examination performance</p>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
          {/* Header with student info */}
          <div className="bg-gradient-to-r from-[#043D3B] to-[#0A5C59] p-4 md:p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-3 md:mb-0">
                <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Result Summary</h2>
                <p className="text-teal-100 text-sm md:text-base">{result.studentName || "Student"}</p>
              </div>
              <div className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-base md:text-lg ${
                isPass 
                  ? "bg-green-500 text-white" 
                  : "bg-red-500 text-white"
              }`}>
                {isPass ? "PASS" : "FAIL"}
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            {/* Student Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 text-sm md:text-base mb-2">Student Information</h3>
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <p className="break-words"><span className="text-gray-600">Email:</span> {result.studentEmail}</p>
                  <p><span className="text-gray-600">Class:</span> {result.className}</p>
                  <p><span className="text-gray-600">Test ID:</span> {result.testId}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 text-sm md:text-base mb-2">Performance Summary</h3>
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <p><span className="text-gray-600">Score:</span> <strong>{result.score}/{result.totalMarks}</strong></p>
                  <p><span className="text-gray-600">Percentage:</span> <strong>{percentage}%</strong></p>
                  <p><span className="text-gray-600">Status:</span> 
                    <span className={`font-bold ${isPass ? "text-green-600" : "text-red-600"}`}>
                      {isPass ? " Passed" : " Failed"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 md:mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm font-medium text-gray-700">Overall Performance</span>
                <span className="text-xs md:text-sm font-medium text-gray-700">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 md:h-4">
                <div
                  className={`h-3 md:h-4 rounded-full transition-all duration-1000 ease-out ${
                    isPass ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span className="text-xs">0%</span>
                <span className="text-xs">40%</span>
                <span className="text-xs">100%</span>
              </div>
            </div>

            {/* Subjects Table */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b-2 border-teal-100">
                Subject-wise Marks
              </h3>
              
              {/* Mobile View - Cards */}
              <div className="block md:hidden space-y-3">
                {result.subjects.map((sub, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm">{sub.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sub.total >= 40 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {sub.total >= 40 ? "Pass" : "Fail"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-gray-500">Objective</p>
                        <p className="font-medium">{sub.objective}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Subjective</p>
                        <p className="font-medium">{sub.subjective}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Total</p>
                        <p className="font-bold text-teal-600">{sub.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-hidden rounded-lg shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white">
                        <th className="p-3 md:p-4 text-left font-semibold text-sm md:text-base">Subject</th>
                        <th className="p-3 md:p-4 text-center font-semibold text-sm md:text-base">Objective</th>
                        <th className="p-3 md:p-4 text-center font-semibold text-sm md:text-base">Subjective</th>
                        <th className="p-3 md:p-4 text-center font-semibold text-sm md:text-base">Total</th>
                        <th className="p-3 md:p-4 text-center font-semibold text-sm md:text-base">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((sub, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="p-3 md:p-4 font-medium text-gray-800 text-sm md:text-base">{sub.name}</td>
                          <td className="p-3 md:p-4 text-center text-gray-600 text-sm md:text-base">{sub.objective}</td>
                          <td className="p-3 md:p-4 text-center text-gray-600 text-sm md:text-base">{sub.subjective}</td>
                          <td className="p-3 md:p-4 text-center font-bold text-teal-600 text-sm md:text-base">{sub.total}</td>
                          <td className="p-3 md:p-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              sub.total >= 40 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {sub.total >= 40 ? "Pass" : "Fail"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Final Remarks */}
            <div className={`mt-6 md:mt-8 p-3 md:p-4 rounded-lg text-center ${
              isPass 
                ? "bg-green-50 border border-green-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              <p className={`font-semibold text-sm md:text-base ${isPass ? "text-green-700" : "text-red-700"}`}>
                {isPass 
                  ? "🎉 Congratulations! You have successfully passed the examination." 
                  : "📚 Keep working hard! You can do better in the next attempt."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;