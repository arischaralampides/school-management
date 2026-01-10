import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [editingCourse, setEditingCourse] = useState(null);
  const [editedCourseData, setEditedCourseData] = useState({
    course_name: "",
    course_description: "",
    teacher_id: "",
  });

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    course_name: "",
    course_description: "",
    teacher_id: "",
  });

  const courseIdOf = (c) => c.id ?? c.course_id;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading courses", err);
        setLoading(false);
        toast.error("Failed to load courses!");
      });
  }, []);

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const handleSort = () => {
    const sorted = [...courses].sort((a, b) => {
      const nameA = (a.course_name || "").toLowerCase();
      const nameB = (b.course_name || "").toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setCourses(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredCourses = courses.filter((course) =>
    (course.course_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setEditedCourseData({
      course_name: course.course_name || "",
      course_description: course.course_description || "",
      teacher_id: course.teacher_id || "",
    });
  };

  const handleSaveChanges = async () => {
    try {
      const id = courseIdOf(editingCourse);

      const payload = {
        course_name: editedCourseData.course_name,
        course_description: editedCourseData.course_description,
      };
      if (editedCourseData.teacher_id) payload.teacher_id = editedCourseData.teacher_id;

      const response = await axios.put(`http://localhost:3000/api/courses/${id}`, payload);

      const updated = response.data;
      setCourses((prev) => prev.map((c) => (courseIdOf(c) === courseIdOf(updated) ? updated : c)));

      setEditingCourse(null);
      toast.success("Course updated!");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error(error.response?.data?.message || "Error saving changes.");
    }
  };

  const handleDeleteCourse = async (course) => {
    const ok = window.confirm("Delete this course?");
    if (!ok) return;

    try {
      const id = courseIdOf(course);
      await axios.delete(`http://localhost:3000/api/courses/${id}`);
      setCourses((prev) => prev.filter((c) => courseIdOf(c) !== id));
      toast.success("Course deleted!");
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error(err.response?.data?.message || "Failed to delete course.");
    }
  };

  const handleSaveNewCourse = async () => {
    if (!newCourseData.course_name.trim()) {
      toast.error("Course Name is required!");
      return;
    }

    const payload = {
      course_name: newCourseData.course_name,
      course_description: newCourseData.course_description,
    };
    if (newCourseData.teacher_id) payload.teacher_id = newCourseData.teacher_id;

    try {
      const response = await axios.post("http://localhost:3000/api/courses", payload);
      setCourses((prev) => [...prev, response.data]);
      toast.success("Course added successfully!");
      setIsAddingCourse(false);
      setNewCourseData({ course_name: "", course_description: "", teacher_id: "" });
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error(error.response?.data?.message || "Failed to add course.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl mb-6">
        Courses
      </motion.h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsAddingCourse(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Add Course
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search by course name... (${filteredCourses.length} results)`}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

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
                  Course Name {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((course, index) => {
                const id = courseIdOf(course);
                const isOpen = expanded === id;

                return (
                  <React.Fragment key={id}>
                    <motion.tr
                      whileHover={{ scale: 1.01 }}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpand(id)}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{course.course_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{course.course_description || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {course.teacher ? `${course.teacher.first_name} ${course.teacher.last_name}` : "N/A"}
                      </td>
                      <td className="px-4 py-3 space-x-3">
                        <button
                          className="text-blue-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(course);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCourse(course);
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
                          <td colSpan="5" className="px-6 py-4 text-sm text-gray-700">
                            <motion.div layout className="space-y-1">
                              <div>
                                <strong>Course ID:</strong> {id}
                              </div>
                              <div>
                                <strong>Teacher:</strong>{" "}
                                {course.teacher ? `${course.teacher.first_name} ${course.teacher.last_name}` : "N/A"}
                              </div>
                              <div>
                                <strong>Description:</strong> {course.course_description || "-"}
                              </div>
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

      {/* Add Course Modal */}
      <AnimatePresence>
        {isAddingCourse && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h2 className="text-2xl font-bold mb-4">Add Course</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium">Course Name</label>
                <input
                  type="text"
                  value={newCourseData.course_name}
                  onChange={(e) => setNewCourseData({ ...newCourseData, course_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={newCourseData.course_description}
                  onChange={(e) => setNewCourseData({ ...newCourseData, course_description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Teacher ID (optional)</label>
                <input
                  type="text"
                  value={newCourseData.teacher_id}
                  onChange={(e) => setNewCourseData({ ...newCourseData, teacher_id: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <motion.button
                  onClick={() => {
                    setIsAddingCourse(false);
                    setNewCourseData({ course_name: "", course_description: "", teacher_id: "" });
                  }}
                  className="px-4 py-1 bg-gray-300 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSaveNewCourse}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Course Modal */}
      <AnimatePresence>
        {editingCourse && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium">Course Name</label>
                <input
                  type="text"
                  value={editedCourseData.course_name}
                  onChange={(e) => setEditedCourseData({ ...editedCourseData, course_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={editedCourseData.course_description}
                  onChange={(e) => setEditedCourseData({ ...editedCourseData, course_description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Teacher ID (optional)</label>
                <input
                  type="text"
                  value={editedCourseData.teacher_id}
                  onChange={(e) => setEditedCourseData({ ...editedCourseData, teacher_id: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <motion.button
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-1 bg-gray-300 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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

export default CoursesTable;
