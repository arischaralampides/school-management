export const courseDTO = (course) => ({
  id: course.course_id,
  course_name: course.course_name,
  course_description: course.course_description,
  teacher_id: course.teacher_id,

  teacher: course.teacher
    ? {
        id: course.teacher.teacher_id,
        first_name: course.teacher.first_name,
        last_name: course.teacher.last_name,
      }
    : null,

  gradesCount: course.grades ? course.grades.length : 0,
});

export const courseListDTO = (courses) => courses.map(courseDTO);

// ✅ INPUT DTOs
export const createCourseInputDTO = (body) => ({
  course_name: body.course_name,
  course_description: body.course_description,
  teacher_id: body.teacher_id,
});

export const updateCourseInputDTO = (body) => ({
  course_name: body.course_name,
  course_description: body.course_description,
  teacher_id: body.teacher_id,
});
