import { useState } from "react";
import axios from "axios";

export default function AddResults() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    className: "",
    studentName: "",
    parentName: "",
    testId: "",
    totalMarks: "",
    obtainedMarks: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitStatus(null);
  };

  const handleAddSubject = () => {
    if (!subjectName || subjective === "" || objective === "") {
      alert("Please fill all subject fields!");
      return;
    }

    setSubjects([
      ...subjects,
      {
        name: subjectName,
        subjective: Number(subjective),
        objective: Number(objective),
        total: Number(subjective) + Number(objective),
      },
    ]);

    setSubjectName("");
    setSubjective("");
    setObjective("");
  };

  const handleRemoveSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subjects.length === 0) {
      alert("Add at least one subject!");
      return;
    }

    setIsSubmitting(true);

    const payload = { ...formData, subjects };

    try {
      const res = await axios.post("http://localhost:8080/api/results", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSubmitStatus({ type: "success", message: res.data.msg });
      setFormData({
        studentEmail: "",
        className: "",
        studentName: "",
        parentName: "",
        testId: "",
        totalMarks: "",
        obtainedMarks: "",
      });
      setSubjects([]);
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: err.response?.data?.msg || err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalMarks = subjects.reduce((acc, sub) => acc + sub.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#043D3B] to-[#0A5C59] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Student Results Portal</h1>
          <p className="text-teal-100 text-lg">Add and manage student examination results</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#043D3B] to-[#0A5C59] p-6">
            <h2 className="text-3xl font-bold text-white text-center">Add Student Result</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Student Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-teal-100">
                Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Enter student name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    placeholder="Enter parent name"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test ID *
                  </label>
                  <input
                    type="text"
                    name="testId"
                    placeholder="Enter test ID"
                    value={formData.testId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <input
                    type="text"
                    name="className"
                    placeholder="Enter class"
                    value={formData.className}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Email *
                  </label>
                  <input
                    type="email"
                    name="studentEmail"
                    placeholder="Enter student email"
                    value={formData.studentEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Marks Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-teal-100">
                Marks Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Marks *
                  </label>
                  <input
                    type="number"
                    name="totalMarks"
                    placeholder="Enter total marks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Obtained Marks *
                  </label>
                  <input
                    type="number"
                    name="obtainedMarks"
                    placeholder="Enter obtained marks"
                    value={formData.obtainedMarks}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Subjects Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-teal-100">
                <h3 className="text-xl font-semibold text-gray-800">Subjects & Marks</h3>
                <span className="text-sm text-gray-600 bg-teal-50 px-3 py-1 rounded-full">
                  {subjects.length} subject(s) added
                </span>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Mathematics"
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Objective
                    </label>
                    <input
                      type="number"
                      placeholder="Marks"
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subjective
                    </label>
                    <input
                      type="number"
                      placeholder="Marks"
                      value={subjective}
                      onChange={(e) => setSubjective(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="w-full px-4 py-2 bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white font-semibold rounded-lg hover:from-[#052E2C] hover:to-[#084B48] transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Add Subject
                    </button>
                  </div>
                </div>
              </div>

              {subjects.length > 0 && (
                <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white">
                        <th className="p-4 text-left font-semibold">Subject</th>
                        <th className="p-4 text-center font-semibold">Objective</th>
                        <th className="p-4 text-center font-semibold">Subjective</th>
                        <th className="p-4 text-center font-semibold">Total</th>
                        <th className="p-4 text-center font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((sub, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium text-gray-800">{sub.name}</td>
                          <td className="p-4 text-center text-gray-600">{sub.objective}</td>
                          <td className="p-4 text-center text-gray-600">{sub.subjective}</td>
                          <td className="p-4 text-center font-bold text-teal-600">{sub.total}</td>
                          <td className="p-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveSubject(idx)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gradient-to-r from-teal-50 to-teal-100 font-bold">
                        <td className="p-4 text-gray-800">Final Total</td>
                        <td className="p-4 text-center"></td>
                        <td className="p-4 text-center"></td>
                        <td className="p-4 text-center text-teal-700 text-xl">{finalMarks}</td>
                        <td className="p-4 text-center"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-all duration-200 shadow-lg ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#043D3B] to-[#0A5C59] hover:from-[#052E2C] hover:to-[#084B48] hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Result...
                </div>
              ) : (
                "Add Student Result"
              )}
            </button>

            {submitStatus && (
              <div
                className={`mt-6 p-4 rounded-lg text-center font-semibold ${
                  submitStatus.type === "error"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}