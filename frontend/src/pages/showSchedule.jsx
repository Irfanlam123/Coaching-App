import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/notifications");
        setSchedules(res.data); // Assuming your backend returns array of notifications
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch schedules");
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) return <p className="text-center">Loading schedules...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">All Test Schedules</h2>

      {schedules.length === 0 ? (
        <p className="text-gray-600 text-center">No schedules found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {schedules.map((schedule) => (
            <div
              key={schedule._id}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <h3 className="text-lg font-semibold text-blue-600">
                {schedule.className}
              </h3>
              <p>
                <strong>Subject:</strong> {schedule.subject}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(schedule.testDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {schedule.testTime}
              </p>
              {schedule.description && (
                <p>
                  <strong>Description:</strong> {schedule.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowSchedule;
