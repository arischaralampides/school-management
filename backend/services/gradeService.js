import * as repo from "../repositories/gradeRepository.js";

export const createGrade = (dto) => repo.create(dto);

export const getAllGrades = () => repo.findAllWithRelations();

export const getGradeById = async (id) => {
  const grade = await repo.findByIdWithRelations(id);
  if (!grade) {
    const err = new Error("Grade not found");
    err.status = 404;
    throw err;
  }
  return grade;
};

export const updateGrade = async (id, dto) => {
  const grade = await repo.findById(id);
  if (!grade) {
    const err = new Error("Grade not found");
    err.status = 404;
    throw err;
  }
  Object.assign(grade, dto);
  await grade.save();
  return grade;
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

export const getAverageStats = () => repo.getAverageByCourse();
export const getHighestStats = () => repo.getHighestByCourse();
