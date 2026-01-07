import Teacher from "../models/teacher.js";
import Class from "../models/class.js";
import Course from "../models/course.js";

export const create = (data) => Teacher.create(data);

export const findAllWithRelations = () =>
  Teacher.findAll({
    include: [
      { model: Class, as: "classes" },   // if you have alias, keep it
      { model: Course, as: "courses" },  // if you have alias, keep it
    ],
  });

export const findById = (id) => Teacher.findByPk(id);

export const findByIdWithRelations = (id) =>
  Teacher.findByPk(id, {
    include: [
      { model: Class, as: "classes" },
      { model: Course, as: "courses" },
    ],
  });

export const remove = (teacher) => teacher.destroy();
