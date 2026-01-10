export const classDTO = (classItem) => ({
  id: classItem.class_id,
  name: classItem.class_name,

  teacher: classItem.teacher
    ? {
        id: classItem.teacher.teacher_id,
        first_name: classItem.teacher.first_name,
        last_name: classItem.teacher.last_name,
      }
    : null,

  course: classItem.course
    ? {
        id: classItem.course.course_id,
        name: classItem.course.course_name,
      }
    : null,

  studentCount: classItem.students ? classItem.students.length : 0,
});

export const classesListDTO = (classes) => classes.map(classDTO);

// ✅ INPUT DTOs
export const createClassInputDTO = (body) => ({
  class_name: body.class_name,
  teacher_id: body.teacher_id,
  course_id: body.course_id,
});

export const updateClassInputDTO = (body) => ({
  class_name: body.class_name,
  teacher_id: body.teacher_id,
  course_id: body.course_id,
});
