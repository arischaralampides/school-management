import Course from "../models/course.js";
import Teacher from "../models/teacher.js";
import Grade from "../models/grades.js";

export const create = (data) => Course.create(data);

export const findAllWithRelations = () =>
  Course.findAll({
    include: [
      { model: Teacher, as: "teacher" }, // if your association uses a different alias, change it
      { model: Grade, as: "grades" },
    ],
  });

export const findById = (id) => Course.findByPk(id);

export const findByIdWithRelations = (id) =>
  Course.findByPk(id, {
    include: [
      { model: Teacher, as: "teacher" },
      { model: Grade, as: "grades" },
    ],
  });

export const remove = (course) => course.destroy();
