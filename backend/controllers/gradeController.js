import * as service from "../services/gradeService.js";

export const createGrade = async (req, res) => {
  try {
    const grade = await service.createGrade(req.body);
    res.status(201).json(grade);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getAllGrades = async (req, res) => {
  try {
    const grades = await service.getAllGrades();
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getGradeById = async (req, res) => {
  try {
    const grade = await service.getGradeById(req.params.id);
    res.status(200).json(grade);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const updateGrade = async (req, res) => {
  try {
    const grade = await service.updateGrade(req.params.id, req.body);
    res.status(200).json(grade);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const deleteGrade = async (req, res) => {
  try {
    await service.deleteGrade(req.params.id);
    res.status(200).json({ message: "Grade has been deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

// Stats endpoints
export const getAverageStats = async (req, res) => {
  try {
    const rows = await service.getAverageStats();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getHighestStats = async (req, res) => {
  try {
    const rows = await service.getHighestStats();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
