import * as service from "../services/classService.js";

export const createClass = async (req, res) => {
  try {
    const cls = await service.createClass(req.body);
    res.status(201).json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await service.getAllClasses();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getClassById = async (req, res) => {
  try {
    const cls = await service.getClassById(req.params.id);
    res.status(200).json(cls);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const updateClass = async (req, res) => {
  try {
    const cls = await service.updateClass(req.params.id, req.body);
    res.status(200).json(cls);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

export const deleteClass = async (req, res) => {
  try {
    await service.deleteClass(req.params.id);
    res.status(200).json({ message: "Class has been deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};
