import Grade from "../models/grades.js";
import Student from "../models/student.js";
import Course from "../models/course.js";
import sequelize from "../config/database.js";

export const create = (data) => Grade.create(data);

export const findAllWithRelations = () =>
  Grade.findAll({
    include: [
      { model: Student, as: "student" },
      { model: Course, as: "course" },
    ],
  });

export const findById = (id) => Grade.findByPk(id);

export const findByIdWithRelations = (id) =>
  Grade.findByPk(id, {
    include: [
      { model: Student, as: "student" },
      { model: Course, as: "course" },
    ],
  });

export const remove = (grade) => grade.destroy();

// Stats
export const getAverageByCourse = async () => {
  // returns [{ course_id, avg_grade }]
  const [rows] = await sequelize.query(`
    SELECT course_id, AVG(grade_value) AS avg_grade
    FROM grades
    GROUP BY course_id
  `);
  return rows;
};

export const getHighestByCourse = async () => {
  const [rows] = await sequelize.query(`
    SELECT course_id, MAX(grade_value) AS max_grade
    FROM grades
    GROUP BY course_id
  `);
  return rows;
};
