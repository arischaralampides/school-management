import Class from './class.js';
import Student from './student.js';
import Teacher from './teacher.js';
import Course from './course.js';
import Grade from './grade.js';
import { sequelize } from '../config/database.js';
import defineRelationships from './relationships.js';


defineRelationships();


console.log(Student.associations);
console.log(Course.associations);

export { sequelize, Teacher, Class, Course, Grade, Student };