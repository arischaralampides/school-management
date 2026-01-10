export const teacherDTO = (teacher) => ({
  id: teacher.teacher_id,
  first_name: teacher.first_name,
  last_name: teacher.last_name,
  email: teacher.email,
  phone: teacher.phone,
  hired_date: teacher.created_at,

  classes: teacher.teacherClasses?.map((cls) => ({
    id: cls.class_id,
    name: cls.class_name,
  })) || [],

  courses: teacher.teacherCourses?.map((course) => ({
    id: course.course_id,
    name: course.course_name,
    description: course.course_description,
  })) || [],
});

export const teachersListDTO = (teachers) => teachers.map(teacherDTO);

// ✅ INPUT DTOs
export const createTeacherInputDTO = (body) => ({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  phone: body.phone,
});

export const updateTeacherInputDTO = (body) => ({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  phone: body.phone,
});
