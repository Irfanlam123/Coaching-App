import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, BookOpen, AlertCircle, Loader } from "lucide-react";

const ShowSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get("https://coaching-app-akr2.onrender.com/api/notifications");
        setSchedules(res.data); // Assuming your backend returns array of notifications
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch schedules. Please try again later.");
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="text-center">
        <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700">Loading schedules...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-500 text-lg font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            📚 Test Schedules
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with all upcoming tests and examinations. Plan your studies accordingly.
          </p>
        </div>

        {schedules.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Schedules Found</h3>
            <p className="text-gray-500">Check back later for upcoming test schedules.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((schedule) => (
              <div
                key={schedule._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100"
              >
                {/* Class Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full">
                    {schedule.className}
                  </h3>
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Subject</span>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{schedule.subject}</p>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Date</span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {new Date(schedule.testDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Time</span>
                    </div>
                    <p className="text-gray-800 font-medium">{schedule.testTime}</p>
                  </div>
                </div>

                {/* Description */}
                {schedule.description && (
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Description</span>
                    <p className="text-gray-700 mt-2 leading-relaxed">{schedule.description}</p>
                  </div>
                )}

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Upcoming Test
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        {schedules.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Showing {schedules.length} scheduled test{schedules.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSchedule;