import * as service from "../services/teacherService.js";

export const createTeacher = async (req, res) => {
  try {
    const teacher = await service.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await service.getAllTeachers();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await service.getTeacherById(req.params.id);
    res.status(200).json(teacher);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await service.updateTeacher(req.params.id, req.body);
    res.status(200).json(teacher);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    await service.deleteTeacher(req.params.id);
    res.status(200).json({ message: "Teacher has been deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};
