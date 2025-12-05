import Student from "../models/student.js";
import Grade from "../models/grades.js";
import Course from "../models/course.js";

export const StudentDAO = {
  
  async findAll() {
    try {
      const students = await Student.findAll({
        include: [
          {
            model: Grade,
            as: "studentGrades", 
            attributes: ["grade_value", "course_id", "grade_date"], 
            include: [
              {
                model: Course,
                as: "course", 
                attributes: ["course_name"], 
              },
            ],
          },
          {
            model: Course,
            as: "courses", 
            attributes: ["name", "description"], 
          },
        ],
      });
      console.log("Students:", students);
      return students;
    } catch (error) {
      console.error("Error in findAll:", error);
      throw error;
    }
  },

  
  async findById(id) {
    try {
      const student = await Student.findByPk(id, {
        include: [
          {
            model: Grade,
            as: "studentGrades", 
            attributes: ["grade_value", "course_id", "grade_date"], 
            include: [
              {
                model: Course,
                as: "course", 
                attributes: ["course_name"], 
              },
            ],
          },
          {
            model: Course,
            as: "courses", 
            attributes: ["name", "description"], 
          },
        ],
      });
      return student;
    } catch (error) {
      console.error("Error in findById:", error);
      throw error;
    }
  },

  // create new student
  async create(studentData) {
    try {
      return await Student.create(studentData);
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  },

  
  async update(id, studentData) {
    try {
      const student = await Student.findByPk(id);
      if (!student) return null;

      return await student.update(studentData);
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  },

  
  async delete(id) {
    try {
      const student = await Student.findByPk(id);
      if (!student) return null;

      await student.destroy();
      return student;
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  },
};