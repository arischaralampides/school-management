import * as repo from "../repositories/gradeRepository.js";
import {
  gradeDTO,
  gradesListDTO,
  createGradeInputDTO,
  updateGradeInputDTO,
} from "../DTO/gradesDTO.js";

export const createGrade = async (body) => {
  const payload = createGradeInputDTO(body);
  const created = await repo.create(payload);
  const full = await repo.findByIdWithRelations(created.grade_id);
  return gradeDTO(full);
};

export const getAllGrades = async () => {
  const grades = await repo.findAllWithRelations();
  return gradesListDTO(grades);
};

export const getGradeById = async (id) => {
  const grade = await repo.findByIdWithRelations(id);
  if (!grade) {
    const err = new Error("Grade not found");
    err.status = 404;
    throw err;
  }
  return gradeDTO(grade);
};

export const updateGrade = async (id, body) => {
  const grade = await repo.findById(id);
  if (!grade) {
    const err = new Error("Grade not found");
    err.status = 404;
    throw err;
  }

  const payload = updateGradeInputDTO(body);
  Object.keys(payload).forEach((k) => {
    if (payload[k] !== undefined) grade[k] = payload[k];
  });

  await grade.save();
  const full = await repo.findByIdWithRelations(id);
  return gradeDTO(full);
};

export const deleteGrade = async (id) => {
  const grade = await repo.findById(id);
  if (!grade) {
    const err = new Error("Grade not found");
    err.status = 404;
    throw err;
  }
  await repo.remove(grade);
  return true;
};

// Stats endpoints
export const getAverageStats = () => repo.getAverageByCourse();
export const getHighestStats = () => repo.getHighestByCourse();
