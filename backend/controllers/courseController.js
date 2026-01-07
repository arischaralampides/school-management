import * as service from "../services/courseService.js";

export const createCourse = async (req, res) => {
  try {
    const course = await service.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await service.getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await service.getCourseById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await service.updateCourse(req.params.id, req.body);
    res.status(200).json(course);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await service.deleteCourse(req.params.id);
    res.status(200).json({ message: "Course has been deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};
