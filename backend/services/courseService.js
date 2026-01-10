import * as repo from "../repositories/courseRepository.js";
import {
  courseDTO,
  courseListDTO,
  createCourseInputDTO,
  updateCourseInputDTO,
} from "../DTO/courseDTO.js";

export const createCourse = async (body) => {
  const payload = createCourseInputDTO(body);
  const created = await repo.create(payload);
  const full = await repo.findByIdWithRelations(created.course_id);
  return courseDTO(full);
};

export const getAllCourses = async () => {
  const courses = await repo.findAllWithRelations();
  return courseListDTO(courses);
};

export const getCourseById = async (id) => {
  const course = await repo.findByIdWithRelations(id);
  if (!course) {
    const err = new Error("Course not found");
    err.status = 404;
    throw err;
  }
  return courseDTO(course);
};

export const updateCourse = async (id, body) => {
  const course = await repo.findById(id);
  if (!course) {
    const err = new Error("Course not found");
    err.status = 404;
    throw err;
  }

  const payload = updateCourseInputDTO(body);
  Object.keys(payload).forEach((k) => {
    if (payload[k] !== undefined) course[k] = payload[k];
  });

  await course.save();
  const full = await repo.findByIdWithRelations(id);
  return courseDTO(full);
};

export const deleteCourse = async (id) => {
  const course = await repo.findById(id);
  if (!course) {
    const err = new Error("Course not found");
    err.status = 404;
    throw err;
  }
  await repo.remove(course);
  return true;
};
