import * as repo from "../repositories/studentRepository.js";

export const createStudent = (dto) => repo.create(dto);

export const getAllStudents = () => repo.findAllWithRelations();

export const getStudentById = async (id) => {
  const student = await repo.findByIdWithRelations(id);
  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    throw err;
  }
  return student;
};

export const updateStudent = async (id, dto) => {
  const student = await repo.findById(id);
  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    throw err;
  }

  Object.assign(student, dto);
  await student.save();
  return student;
};

export const deleteStudent = async (id) => {
  const student = await repo.findById(id);
  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    throw err;
  }
  await repo.remove(student);
  return true;
};

export const getGenderStats = () => repo.genderCounts();

export const getEnrollmentStats = () => repo.monthlyEnrollmentCounts(new Date().getFullYear());
