import Class from "../models/class.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Course from "../models/course.js";

export const create = (data) => Class.create(data);

export const findAllWithRelations = () =>
  Class.findAll({
    include: [
      { model: Student, as: "students" },
      { model: Teacher, as: "teacher" },
      { model: Course, as: "course" },
    ],
  });

export const findById = (id) => Class.findByPk(id);

export const findByIdWithRelations = (id) =>
  Class.findByPk(id, {
    include: [
      { model: Student, as: "students" },
      { model: Teacher, as: "teacher" },
      { model: Course, as: "course" },
    ],
  });

export const remove = (cls) => cls.destroy();
