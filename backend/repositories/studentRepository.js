import Student from "../models/student.js";
import Class from "../models/class.js";
import Grade from "../models/grades.js";
import Course from "../models/course.js";
import { Op } from "sequelize";

export const create = (data) => Student.create(data);

const includes = [
  { model: Class, attributes: ["class_name"], as: "class" },
  {
    model: Grade,
    attributes: ["grade_id", "grade_value", "course_id", "grade_date"],
    as: "studentGrades",
    include: [{ model: Course, attributes: ["course_name"], as: "course" }],
  },
  // ✅ include many-to-many courses
  {
    model: Course,
    as: "courses",
    attributes: ["course_id", "course_name"],
    through: { attributes: [] }, // hide join table fields
  },
];

export const findAllWithRelations = () =>
  Student.findAll({
    include: includes,
  });

export const findByIdWithRelations = (id) =>
  Student.findByPk(id, {
    include: includes,
  });

export const findById = (id) => Student.findByPk(id);

export const remove = (student) => student.destroy();

export const genderCounts = async () => {
  const [male, female, other] = await Promise.all([
    Student.count({ where: { gender: "Male" } }),
    Student.count({ where: { gender: "Female" } }),
    Student.count({ where: { gender: "Other" } }),
  ]);
  return { Male: male, Female: female, Other: other };
};

export const monthlyEnrollmentCounts = async (year) => {
  const out = [];
  for (let month = 1; month <= 12; month++) {
    const count = await Student.count({
      where: {
        created_at: {
          [Op.gte]: new Date(year, month - 1, 1),
          [Op.lt]: new Date(year, month, 1),
        },
      },
    });
    out.push(count);
  }
  return out;
};
