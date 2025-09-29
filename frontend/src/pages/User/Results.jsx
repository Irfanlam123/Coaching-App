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

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>{error}</p>;
  if (!result) return <p>No results available.</p>;

  const percentage = result.percentage;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Your Result</h2>
      <p>Email: {result.studentEmail}</p>
      <p>Class: {result.className}</p>
      <p>Score: {result.score}/{result.totalMarks}</p>
      <p>Percentage: {percentage}%</p>
      <p>Status: {percentage >= 40 ? "Pass" : "Fail"}</p>
    </div>
  );
};

export default Results;
