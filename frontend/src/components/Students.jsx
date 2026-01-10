import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentForm from "./AddStudentForm";
import StudentsCourseTable from "./StudentsCourseTable";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [showGradesTable, setShowGradesTable] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const [editedStudentData, setEditedStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    class_id: "",
  });

  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  const studentIdOf = (s) => s.id ?? s.student_id;
  const classIdOf = (c) => c.id ?? c.class_id;
  const courseIdOf = (c) => c.id ?? c.course_id;

  const loadAll = async () => {
    setLoading(true);
    try {
      const [studentsRes, classesRes, coursesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/students"),
        axios.get("http://localhost:3000/api/classes"),
        axios.get("http://localhost:3000/api/courses"),
      ]);
      setStudents(studentsRes.data || []);
      setClasses(classesRes.data || []);
      setCourses(coursesRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const handleSort = () => {
    const sorted = [...students].sort((a, b) => {
      const nameA = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase();
      const nameB = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setStudents(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredStudents = students.filter((student) =>
    `${student.first_name || ""} ${student.last_name || ""} ${studentIdOf(student) || ""} ${student.email || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const calculateAverage = (grades) => {
    if (!grades || grades.length === 0) return "-";
    const sum = grades.reduce((total, g) => total + parseFloat(g.grade_value || 0), 0);
    return (sum / grades.length).toFixed(2);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);

    setEditedStudentData({
      first_name: student.first_name || "",
      last_name: student.last_name || "",
      email: student.email || "",
      phone: student.phone || "",
      gender: student.gender || "",
      date_of_birth: student.date_of_birth || "",
      class_id: student.class_id || "",
    });

    // backend now returns student.courses: [{course_id,...}]
    const ids = (student.courses || []).map((c) => courseIdOf(c));
    setSelectedCourseIds(ids);
  };

  const toggleCourse = (id) => {
    setSelectedCourseIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSaveChanges = async () => {
    try {
      const id = studentIdOf(editingStudent);

      // 1) update student profile + class
      const payload = { ...editedStudentData };
      if (!payload.class_id) delete payload.class_id;

      await axios.put(`http://localhost:3000/api/students/${id}`, payload);

      // 2) set student courses
      await axios.put(`http://localhost:3000/api/students/${id}/courses`, {
        course_ids: selectedCourseIds,
      });

      toast.success("Student updated (class + courses)!");
      setEditingStudent(null);

      await loadAll();
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error(error.response?.data?.message || "Error saving changes.");
    }
  };

  const handleDeleteStudent = async (student) => {
    const ok = window.confirm("Delete this student?");
    if (!ok) return;

    try {
      const id = studentIdOf(student);
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      setStudents((prev) => prev.filter((s) => studentIdOf(s) !== id));
      toast.success("Student deleted!");
    } catch (err) {
      console.error("Error deleting student:", err);
      toast.error(err.response?.data?.message || "Failed to delete student.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl mb-6">
        Students
      </motion.h1>

      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => setShowAddStudentForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
        >
          + Add Student
        </button>

        <button
          onClick={() => setShowGradesTable((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
        >
          {showGradesTable ? "Back to Students" : "Show Grades"}
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-lg ml-auto"
        />
      </div>

      {showAddStudentForm && (
        <AddStudentForm setShowAddStudentForm={setShowAddStudentForm} setStudents={setStudents} />
      )}

      {!showGradesTable ? (
        <div className="bg-white p-4 rounded-2xl shadow-xl overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <ClipLoader color="#3B82F6" loading={loading} size={50} />
            </div>
          ) : (
            <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-full table-auto">
              <thead>
                <tr className="text-center border-b text-gray-600">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3 cursor-pointer" onClick={handleSort}>
                    Full Name {sortOrder === "asc" ? "↑" : "↓"}
                  </th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Average Grades</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Courses</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => {
                  const id = studentIdOf(student);
                  const isOpen = expanded === id;

                  const grades = student.grades || student.studentGrades || [];
                  const courseNames = (student.courses || []).map((c) => c.course_name).join(", ");

                  return (
                    <React.Fragment key={id}>
                      <motion.tr
                        whileHover={{ scale: 1.01 }}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleExpand(id)}
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium">
                          {student.first_name} {student.last_name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{student.email || "-"}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {calculateAverage(grades)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{student.class || "-"}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{courseNames || "-"}</td>
                        <td className="px-4 py-3 space-x-3">
                          <button
                            className="text-blue-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(student);
                            }}
                          >
                            Edit/Assign
                          </button>
                          <button
                            className="text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStudent(student);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-blue-50"
                          >
                            <td colSpan="7" className="px-6 py-4 text-left text-gray-700">
                              <motion.div layout className="space-y-1">
                                <div><strong>Student ID:</strong> {id}</div>
                                <div><strong>Class:</strong> {student.class || "-"}</div>
                                <div><strong>Courses:</strong> {courseNames || "-"}</div>
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </motion.table>
          )}
        </div>
      ) : (
        <StudentsCourseTable students={students} setStudents={setStudents} searchTerm={searchTerm} />
      )}

      {/* Edit/Assign Modal */}
      <AnimatePresence>
        {editingStudent && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Student / Assign</h2>

              <div className="mb-3">
                <label className="block text-sm font-medium">First Name</label>
                <input
                  className="w-full p-2 border rounded"
                  value={editedStudentData.first_name}
                  onChange={(e) => setEditedStudentData({ ...editedStudentData, first_name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  className="w-full p-2 border rounded"
                  value={editedStudentData.last_name}
                  onChange={(e) => setEditedStudentData({ ...editedStudentData, last_name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Email</label>
                <input
                  className="w-full p-2 border rounded"
                  value={editedStudentData.email}
                  onChange={(e) => setEditedStudentData({ ...editedStudentData, email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Phone</label>
                <input
                  className="w-full p-2 border rounded"
                  value={editedStudentData.phone}
                  onChange={(e) => setEditedStudentData({ ...editedStudentData, phone: e.target.value })}
                />
              </div>

              {/* ✅ Assign Class */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Class</label>
                <select
                  className="w-full p-2 border rounded"
                  value={editedStudentData.class_id || ""}
                  onChange={(e) => setEditedStudentData({ ...editedStudentData, class_id: e.target.value })}
                >
                  <option value="">— No class —</option>
                  {classes.map((c) => (
                    <option key={classIdOf(c)} value={classIdOf(c)}>
                      {c.class_name} ({c.class_type}) — {c.schedule}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Assign Courses */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Courses</label>
                <div className="max-h-40 overflow-y-auto border rounded p-2">
                  {courses.map((c) => {
                    const cid = courseIdOf(c);
                    const checked = selectedCourseIds.includes(cid);
                    return (
                      <label key={cid} className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCourse(cid)}
                        />
                        <span>{c.course_name}</span>
                      </label>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Tick courses to assign this student. Saving will overwrite the student’s course list.
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <motion.button
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentsTable;
