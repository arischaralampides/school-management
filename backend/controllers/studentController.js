import * as service from "../services/studentService.js";

export const getGenderStats = async (req, res) => {
  try {
    const stats = await service.getGenderStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEnrollmentStats = async (req, res) => {
  try {
    const stats = await service.getEnrollmentStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const newStudent = await service.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await service.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await service.getStudentById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updated = await service.updateStudent(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await service.deleteStudent(req.params.id);
    res.status(200).json({ message: "Student has been deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const setCoursesForStudent = async (req, res) => {
  try {
    const { course_ids } = req.body;

    if (!Array.isArray(course_ids)) {
      return res.status(400).json({ message: "course_ids must be an array" });
    }

    const updated = await service.setStudentCourses(req.params.id, course_ids);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getCoursesForStudent = async (req, res) => {
  try {
    const courses = await service.getStudentCourses(req.params.id);
    res.status(200).json(courses);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

