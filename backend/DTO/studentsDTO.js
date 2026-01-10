export const studentDTO = (student) => ({
  id: student.student_id,
  first_name: student.first_name,
  last_name: student.last_name,
  name: `${student.first_name} ${student.last_name}`,
  email: student.email,
  gender: student.gender,
  date_of_birth: student.date_of_birth,
  enrollment_date: student.enrollment_date,
  class: student.class ? student.class.class_name : "No class assigned",
  class_id: student.class_id,

  grades: student.studentGrades
    ? student.studentGrades.map((grade) => ({
        grade_value: grade.grade_value,
        course_id: grade.course_id,
        course_name: grade.course?.course_name || "Unknown course",
        grade_date: grade.grade_date,
      }))
    : [],
});

export const studentsListDTO = (students) => students.map(studentDTO);

// ✅ INPUT DTOs (whitelist fields)
export const createStudentInputDTO = (body) => ({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  gender: body.gender,
  date_of_birth: body.date_of_birth,
  enrollment_date: body.enrollment_date,
  class_id: body.class_id,
});

export const updateStudentInputDTO = (body) => ({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  gender: body.gender,
  date_of_birth: body.date_of_birth,
  enrollment_date: body.enrollment_date,
  class_id: body.class_id,
});
