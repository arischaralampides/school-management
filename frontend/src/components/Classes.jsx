import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:3000/api";

// ---------- helpers to normalize id fields ----------
const teacherIdOf = (t) => t?.id ?? t?.teacher_id;
const courseIdOf = (c) => c?.id ?? c?.course_id;

// ---------- Modal shell ----------
function Modal({ title, children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white w-full max-w-lg rounded-xl shadow-xl p-5"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 60 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            className="px-2 py-1 rounded hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        {children}
      </motion.div>
    </motion.div>
  );
}

// ---------- Form (used by Add/Edit) ----------
function ClassForm({
  mode, // "create" | "edit"
  teachers,
  courses,
  initialValues,
  onCancel,
  onSubmit,
}) {
  const [formData, setFormData] = useState(() => ({
    class_name: initialValues?.class_name ?? "",
    class_type: initialValues?.class_type ?? "",
    schedule: initialValues?.schedule ?? "",
    teacher_id: initialValues?.teacher_id ?? "",
    course_id: initialValues?.course_id ?? "",
  }));

  useEffect(() => {
    setFormData({
      class_name: initialValues?.class_name ?? "",
      class_type: initialValues?.class_type ?? "",
      schedule: initialValues?.schedule ?? "",
      teacher_id: initialValues?.teacher_id ?? "",
      course_id: initialValues?.course_id ?? "",
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic required fields (based on your model)
    if (!formData.class_name.trim()) {
      toast.error("Class name is required.");
      return;
    }
    if (!formData.class_type.trim()) {
      toast.error("Class type is required.");
      return;
    }
    if (!formData.schedule.trim()) {
      toast.error("Schedule is required.");
      return;
    }

    // build payload, omit optional FKs if not chosen
    const payload = {
      class_name: formData.class_name.trim(),
      class_type: formData.class_type.trim(),
      schedule: formData.schedule.trim(),
    };

    if (formData.teacher_id) payload.teacher_id = Number(formData.teacher_id);
    if (formData.course_id) payload.course_id = Number(formData.course_id);

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Class name *</label>
        <input
          name="class_name"
          value={formData.class_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. A1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Class type *</label>
        <input
          name="class_type"
          value={formData.class_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. Morning / Evening / Lab"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Schedule *</label>
        <input
          name="schedule"
          value={formData.schedule}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="e.g. Mon-Wed 10:00-12:00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Teacher (optional)</label>
        <select
          name="teacher_id"
          value={formData.teacher_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">— Assign later —</option>
          {teachers.map((t) => (
            <option key={teacherIdOf(t)} value={teacherIdOf(t)}>
              {(t.first_name ?? "") + " " + (t.last_name ?? "")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Course (optional)</label>
        <select
          name="course_id"
          value={formData.course_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">— Assign later —</option>
          {courses.map((c) => (
            <option key={courseIdOf(c)} value={courseIdOf(c)}>
              {c.course_name ?? c.name ?? "Course"}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {mode === "create" ? "Create" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // modals
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null); // class object
  const [deleting, setDeleting] = useState(null); // class object

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return classes;
    return classes.filter((c) => {
      const name = (c.class_name ?? c.name ?? "").toLowerCase();
      const type = (c.class_type ?? "").toLowerCase();
      const sched = (c.schedule ?? "").toLowerCase();
      return name.includes(q) || type.includes(q) || sched.includes(q);
    });
  }, [classes, search]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [clsRes, tRes, cRes] = await Promise.all([
        axios.get(`${API}/classes`),
        axios.get(`${API}/teachers`),
        axios.get(`${API}/courses`),
      ]);

      // classes from backend might be DTO or raw; support both:
      const cls = clsRes.data ?? [];
      const t = tRes.data ?? [];
      const c = cRes.data ?? [];

      setClasses(cls);
      setTeachers(t);
      setCourses(c);
    } catch (err) {
      console.error("Failed to load classes/teachers/courses", err);
      toast.error(err.response?.data?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const classIdOf = (cls) => cls?.class_id ?? cls?.id;

  const teacherNameFor = (cls) => {
    // if DTO provides nested teacher:
    if (cls?.teacher?.first_name || cls?.teacher?.last_name) {
      return `${cls.teacher.first_name ?? ""} ${cls.teacher.last_name ?? ""}`.trim();
    }
    // otherwise find by teacher_id:
    const tid = cls?.teacher_id;
    if (!tid) return "—";
    const t = teachers.find((x) => teacherIdOf(x) === tid);
    return t ? `${t.first_name ?? ""} ${t.last_name ?? ""}`.trim() : "—";
  };

  const courseNameFor = (cls) => {
    // if DTO provides nested course:
    if (cls?.course?.name || cls?.course?.course_name) {
      return cls.course.name ?? cls.course.course_name;
    }
    // otherwise find by course_id:
    const cid = cls?.course_id;
    if (!cid) return "—";
    const c = courses.find((x) => courseIdOf(x) === cid);
    return c ? c.course_name ?? c.name : "—";
  };

  // ---------- CRUD handlers ----------
  const handleCreate = async (payload) => {
    try {
      const res = await axios.post(`${API}/classes`, payload);
      toast.success("Class created!");
      setShowCreate(false);

      // best: reload to get relations/DTOs consistent
      await loadAll();

      // if you prefer optimistic add:
      // setClasses((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Create class failed", err);
      toast.error(err.response?.data?.message || "Failed to create class.");
    }
  };

  const handleUpdate = async (classId, payload) => {
    try {
      await axios.put(`${API}/classes/${classId}`, payload);
      toast.success("Class updated!");
      setEditing(null);
      await loadAll();
    } catch (err) {
      console.error("Update class failed", err);
      toast.error(err.response?.data?.message || "Failed to update class.");
    }
  };

  const handleDelete = async (classId) => {
    try {
      await axios.delete(`${API}/classes/${classId}`);
      toast.success("Class deleted!");
      setDeleting(null);
      setClasses((prev) => prev.filter((c) => classIdOf(c) !== classId));
    } catch (err) {
      console.error("Delete class failed", err);
      toast.error(err.response?.data?.message || "Failed to delete class.");
    }
  };

  // ---------- render ----------
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold">Classes</h1>
          <p className="text-gray-600">Create, edit, and delete classes.</p>
        </div>

        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-full md:w-72"
            placeholder="Search by name/type/schedule..."
          />
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            + Add Class
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-4 text-gray-600">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Schedule</th>
                <th className="text-left px-4 py-3">Teacher</th>
                <th className="text-left px-4 py-3">Course</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-gray-600" colSpan={6}>
                    No classes found.
                  </td>
                </tr>
              ) : (
                filtered.map((cls) => {
                  const id = classIdOf(cls);
                  return (
                    <tr key={id} className="border-t">
                      <td className="px-4 py-3 font-medium">
                        {cls.class_name ?? cls.name}
                      </td>
                      <td className="px-4 py-3">{cls.class_type ?? "—"}</td>
                      <td className="px-4 py-3">{cls.schedule ?? "—"}</td>
                      <td className="px-4 py-3">{teacherNameFor(cls)}</td>
                      <td className="px-4 py-3">{courseNameFor(cls)}</td>
                      <td className="px-4 py-3 space-x-3">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => {
                            // normalize initial values for edit form
                            setEditing({
                              ...cls,
                              teacher_id:
                                cls.teacher_id ??
                                (cls.teacher ? teacherIdOf(cls.teacher) : "") ??
                                "",
                              course_id:
                                cls.course_id ??
                                (cls.course ? courseIdOf(cls.course) : "") ??
                                "",
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => setDeleting(cls)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE MODAL */}
      <AnimatePresence>
        {showCreate && (
          <Modal title="Add Class" onClose={() => setShowCreate(false)}>
            <ClassForm
              mode="create"
              teachers={teachers}
              courses={courses}
              initialValues={null}
              onCancel={() => setShowCreate(false)}
              onSubmit={handleCreate}
            />
          </Modal>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editing && (
          <Modal title="Edit Class" onClose={() => setEditing(null)}>
            <ClassForm
              mode="edit"
              teachers={teachers}
              courses={courses}
              initialValues={editing}
              onCancel={() => setEditing(null)}
              onSubmit={(payload) => handleUpdate(classIdOf(editing), payload)}
            />
          </Modal>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRM MODAL */}
      <AnimatePresence>
        {deleting && (
          <Modal title="Delete Class" onClose={() => setDeleting(null)}>
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deleting.class_name ?? deleting.name}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-2 mt-5">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setDeleting(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(classIdOf(deleting))}
                type="button"
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
