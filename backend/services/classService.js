import * as repo from "../repositories/classRepository.js";

export const createClass = (dto) => repo.create(dto);

export const getAllClasses = () => repo.findAllWithRelations();

export const getClassById = async (id) => {
  const cls = await repo.findByIdWithRelations(id);
  if (!cls) {
    const err = new Error("Class not found");
    err.status = 404;
    throw err;
  }
  return cls;
};

export const updateClass = async (id, dto) => {
  const cls = await repo.findById(id);
  if (!cls) {
    const err = new Error("Class not found");
    err.status = 404;
    throw err;
  }
  Object.assign(cls, dto);
  await cls.save();
  return cls;
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
