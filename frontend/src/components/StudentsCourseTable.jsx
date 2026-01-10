import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentsCourseTable = ({ students, setStudents, searchTerm = "" }) => {
  const [editingGrade, setEditingGrade] = useState(null); // { studentId, gradeIndex }
  const [newGradeValue, setNewGradeValue] = useState("");

  const studentIdOf = (s) => s.id ?? s.student_id;

  const handleEditClick = (studentId, gradeIndex, currentGrade) => {
    setEditingGrade({ studentId, gradeIndex });
    setNewGradeValue(currentGrade);
  };

  const handleSaveClick = async (studentId, gradeIndex) => {
    try {
      const updatedStudents = [...students];
      const student = updatedStudents.find((s) => studentIdOf(s) === studentId);
      const grade = (student.grades || [])[gradeIndex];

      if (!grade?.grade_id) {
        toast.error("Missing grade_id from API. Fix backend include/DTO.");
        return;
      }

      // update locally
      grade.grade_value = newGradeValue;

      // send correct update
      await axios.put(`http://localhost:3000/api/grades/${grade.grade_id}`, {
        grade_value: newGradeValue,
      });

      setStudents(updatedStudents);
      setEditingGrade(null);
      toast.success("Grade updated successfully!");
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error(error.response?.data?.message || "Failed to update grade.");
    }
  };

  const calculateAverage = (grades) => {
    if (!grades || grades.length === 0) return "N/A";
    const total = grades.reduce((sum, g) => sum + parseFloat(g.grade_value || 0), 0);
    return (total / grades.length).toFixed(2);
  };

  const filteredStudents = students.filter((student) =>
    `${student.first_name} ${student.last_name} ${student.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl overflow-x-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-full table-auto">
        <thead>
          <tr className="text-center border-b text-gray-600">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Student Name</th>
            <th className="px-4 py-3">Courses</th>
            <th className="px-4 py-3">Grades</th>
            <th className="px-4 py-3">Average</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student, studentIndex) => {
            const sid = studentIdOf(student);
            const grades = student.grades || [];

            return (
              <tr key={sid} className="text-center border-b hover:bg-gray-50">
                <td className="px-4 py-3">{studentIndex + 1}</td>
                <td className="px-4 py-3 font-medium">
                  {student.first_name} {student.last_name}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {grades.length > 0 ? (
                    grades.map((g) => <div key={g.grade_id}>{g.course_name || "Unknown"}</div>)
                  ) : (
                    <span className="text-gray-500">No courses available</span>
                  )}
                </td>

                <td className="px-4 py-3 text-sm text-gray-500">
                  {grades.length > 0 ? (
                    grades.map((g, idx) => (
                      <div key={g.grade_id}>
                        {editingGrade &&
                        editingGrade.studentId === sid &&
                        editingGrade.gradeIndex === idx ? (
                          <input
                            type="number"
                            value={newGradeValue}
                            onChange={(e) => setNewGradeValue(e.target.value)}
                            onBlur={() => handleSaveClick(sid, idx)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveClick(sid, idx);
                            }}
                            className="border border-gray-300 rounded px-2 py-1"
                            autoFocus
                          />
                        ) : (
                          <span
                            onClick={() => handleEditClick(sid, idx, g.grade_value)}
                            className="cursor-pointer hover:underline"
                          >
                            {g.grade_value ?? "N/A"}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">No grades available</span>
                  )}
                </td>

                <td className="px-4 py-3 text-sm font-bold text-gray-700">
                  {calculateAverage(grades)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </motion.table>
    </div>
  );
};

export default StudentsCourseTable;
