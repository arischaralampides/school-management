import Class from './class.js';
import Student from './student.js';
import Teacher from './teacher.js';
import Course from './course.js';
import Grade from './grades.js'; 

export default function defineRelationships() {
 
  Class.hasMany(Student, {
    foreignKey: 'class_id',
    as: 'students',
  });
  Class.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    as: 'teacher',
  });
  Class.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course',
  });

  
  Student.belongsTo(Class, {
    foreignKey: 'class_id',
    as: 'class',
  });

  
  Teacher.hasMany(Class, {
    foreignKey: 'teacher_id',
    as: 'teacherClasses', 
  });

  Teacher.hasMany(Course, {
    foreignKey: 'teacher_id',
    as: 'teacherCourses', 
  });

  
  Course.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    as: 'teacher', 
  });

  Course.hasMany(Class, {
    foreignKey: 'course_id',
    as: 'classes',
  });

  
  Student.hasMany(Grade, {
    foreignKey: 'student_id',
    as: 'studentGrades', 
  });

  Grade.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student', 
  });
  Grade.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course',
  });
  
  Student.belongsToMany(Course, {
    through: 'studentcourses', 
    foreignKey: 'student_id',
    otherKey: 'course_id',
    as: 'courses', 
  });

  Course.belongsToMany(Student, {
    through: 'studentcourses',
    foreignKey: 'course_id',
    otherKey: 'student_id',
    as: 'students', 
  });
}