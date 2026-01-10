import * as repo from "../repositories/teacherRepository.js";
import {
  teacherDTO,
  teachersListDTO,
  createTeacherInputDTO,
  updateTeacherInputDTO,
} from "../DTO/teachersDTO.js";

export const createTeacher = async (body) => {
  const payload = createTeacherInputDTO(body);
  const created = await repo.create(payload);
  const full = await repo.findByIdWithRelations(created.teacher_id);
  return teacherDTO(full);
};

export const getAllTeachers = async () => {
  const teachers = await repo.findAllWithRelations();
  return teachersListDTO(teachers);
};

export const getTeacherById = async (id) => {
  const teacher = await repo.findByIdWithRelations(id);
  if (!teacher) {
    const err = new Error("Teacher not found");
    err.status = 404;
    throw err;
  }
  return teacherDTO(teacher);
};

export const updateTeacher = async (id, body) => {
  const teacher = await repo.findById(id);
  if (!teacher) {
    const err = new Error("Teacher not found");
    err.status = 404;
    throw err;
  }

  const payload = updateTeacherInputDTO(body);
  Object.keys(payload).forEach((k) => {
    if (payload[k] !== undefined) teacher[k] = payload[k];
  });

  await teacher.save();
  const full = await repo.findByIdWithRelations(id);
  return teacherDTO(full);
};

export const deleteTeacher = async (id) => {
  const teacher = await repo.findById(id);
  if (!teacher) {
    const err = new Error("Teacher not found");
    err.status = 404;
    throw err;
  }
  await repo.remove(teacher);
  return true;
};
