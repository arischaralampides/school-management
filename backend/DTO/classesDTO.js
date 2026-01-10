export const classDTO = (classItem) => ({
  id: classItem.class_id,
  class_id: classItem.class_id, // keep both for convenience
  class_name: classItem.class_name,
  class_type: classItem.class_type,
  schedule: classItem.schedule,
  teacher_id: classItem.teacher_id,
  course_id: classItem.course_id,

  teacher: classItem.teacher
    ? {
        id: classItem.teacher.teacher_id,
        teacher_id: classItem.teacher.teacher_id,
        first_name: classItem.teacher.first_name,
        last_name: classItem.teacher.last_name,
      }
    : null,

  course: classItem.course
    ? {
        id: classItem.course.course_id,
        course_id: classItem.course.course_id,
        course_name: classItem.course.course_name,
      }
    : null,

  studentCount: classItem.students ? classItem.students.length : 0,
});

export const classesListDTO = (classes) => classes.map(classDTO);

// ✅ INPUT DTOs (must include required fields)
export const createClassInputDTO = (body) => ({
  class_name: body.class_name,
  class_type: body.class_type,
  schedule: body.schedule,
  teacher_id: body.teacher_id,
  course_id: body.course_id,
});

export const updateClassInputDTO = (body) => ({
  class_name: body.class_name,
  class_type: body.class_type,
  schedule: body.schedule,
  teacher_id: body.teacher_id,
  course_id: body.course_id,
});
