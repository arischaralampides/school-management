import * as repo from "../repositories/classRepository.js";
import {
  classDTO,
  classesListDTO,
  createClassInputDTO,
  updateClassInputDTO,
} from "../DTO/classesDTO.js";

export const createClass = async (body) => {
  const payload = createClassInputDTO(body);
  const created = await repo.create(payload);
  const full = await repo.findByIdWithRelations(created.class_id);
  return classDTO(full);
};

export const getAllClasses = async () => {
  const classes = await repo.findAllWithRelations();
  return classesListDTO(classes);
};

export const getClassById = async (id) => {
  const cls = await repo.findByIdWithRelations(id);
  if (!cls) {
    const err = new Error("Class not found");
    err.status = 404;
    throw err;
  }
  return classDTO(cls);
};

export const updateClass = async (id, body) => {
  const cls = await repo.findById(id);
  if (!cls) {
    const err = new Error("Class not found");
    err.status = 404;
    throw err;
  }

  const payload = updateClassInputDTO(body);
  Object.keys(payload).forEach((k) => {
    if (payload[k] !== undefined) cls[k] = payload[k];
  });

  await cls.save();
  const full = await repo.findByIdWithRelations(id);
  return classDTO(full);
};

export const deleteClass = async (id) => {
  const cls = await repo.findById(id);
  if (!cls) {
    const err = new Error("Class not found");
    err.status = 404;
    throw err;
  }
  await repo.remove(cls);
  return true;
};
