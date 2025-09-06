import React, { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Assume user email stored in localStorage after login
    const userEmail = localStorage.getItem("userEmail"); // e.g., "irfan@gmail.com"

    if (!userEmail) {
      setError("❌ Please login to view results");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/results/${userEmail}`
        );
        setResult(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("❌ No result found for this email");
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Student Result
      </h2>
      {result && (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {result.studentName}
          </p>
          <p>
            <strong>Email:</strong> {result.email}
          </p>
          <p>
            <strong>Class:</strong> {result.className}
          </p>
          <p>
            <strong>Score:</strong> {result.score}
          </p>
          <p>
            <strong>Percentage:</strong> {result.percentage}%
          </p>
          <p>
            <strong>GPA:</strong> {result.gpa}
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
