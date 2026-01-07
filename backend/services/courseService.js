import * as repo from "../repositories/courseRepository.js";

export const createCourse = (dto) => repo.create(dto);

export const getAllCourses = () => repo.findAllWithRelations();

export const getCourseById = async (id) => {
  const course = await repo.findByIdWithRelations(id);
  if (!course) {
    const err = new Error("Course not found");
    err.status = 404;
    throw err;
  }
  return course;
};

export const updateCourse = async (id, dto) => {
  const course = await repo.findById(id);
  if (!course) {
    const err = new Error("Course not found");
    err.status = 404;
    throw err;
  }
  Object.assign(course, dto);
  await course.save();
  return course;
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
