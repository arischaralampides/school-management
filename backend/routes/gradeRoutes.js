import express from "express";
import {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
  getAverageStats,
  getHighestStats,
} from "../controllers/gradeController.js";


const router = express.Router();

router.post("/", createGrade);
router.get("/", getAllGrades);
router.get("/:id", getGradeById);
router.get("/stats/average", getAverageStats);
router.get("/stats/highest", getHighestStats);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

export default router;