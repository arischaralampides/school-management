import * as repo from "../repositories/studentRepository.js";
import {
  studentDTO,
  studentsListDTO,
  createStudentInputDTO,
  updateStudentInputDTO,
} from "../DTO/studentsDTO.js";

export const createStudent = async (body) => {
  const payload = createStudentInputDTO(body);
  const created = await repo.create(payload);
  const full = await repo.findByIdWithRelations(created.student_id);
  return studentDTO(full);
};

export const getAllStudents = async () => {
  const students = await repo.findAllWithRelations();
  return studentsListDTO(students);
};

export const getStudentById = async (id) => {
  const student = await repo.findByIdWithRelations(id);
  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    throw err;
  }
  return studentDTO(student);
};

export const updateStudent = async (id, body) => {
  const student = await repo.findById(id);
  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    throw err;
  }

  const payload = updateStudentInputDTO(body);
  Object.keys(payload).forEach((k) => {
    if (payload[k] !== undefined) student[k] = payload[k];
  });

  await student.save();
  const full = await repo.findByIdWithRelations(id);
  return studentDTO(full);
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

// Stats (raw is fine)
export const getGenderStats = () => repo.genderCounts();
export const getEnrollmentStats = () => repo.monthlyEnrollmentCounts(new Date().getFullYear());
