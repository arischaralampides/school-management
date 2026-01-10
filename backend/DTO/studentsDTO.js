export const studentDTO = (student) => {
  const mappedGrades = student.studentGrades
    ? student.studentGrades.map((grade) => ({
        grade_id: grade.grade_id,
        grade_value: grade.grade_value,
        course_id: grade.course_id,
        course_name: grade.course?.course_name || "Unknown course",
        grade_date: grade.grade_date,
      }))
    : [];

  return {
    id: student.student_id,
    student_id: student.student_id, // keep both
    first_name: student.first_name,
    last_name: student.last_name,
    name: `${student.first_name} ${student.last_name}`,
    email: student.email,
    phone: student.phone,
    gender: student.gender,
    date_of_birth: student.date_of_birth,

    class: student.class ? student.class.class_name : "No class assigned",
    class_id: student.class_id,

    // ✅ keep old key
    studentGrades: mappedGrades,
    // ✅ compatibility for your current frontend usage
    grades: mappedGrades,

    // ✅ many-to-many courses
    courses: student.courses
      ? student.courses.map((c) => ({
          id: c.course_id,
          course_id: c.course_id,
          course_name: c.course_name,
        }))
      : [],
  };
};

export const studentsListDTO = (students) => students.map(studentDTO);

// input DTOs
export const createStudentInputDTO = (body) => ({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  phone: body.phone,
  gender: body.gender,
  date_of_birth: body.date_of_birth,
  class_id: body.class_id,
});

export const updateStudentInputDTO = (body) => ({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  phone: body.phone,
  gender: body.gender,
  date_of_birth: body.date_of_birth,
  class_id: body.class_id,
});
