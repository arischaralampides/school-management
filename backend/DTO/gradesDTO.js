export const gradeDTO = (grade) => ({
  id: grade.grade_id,
  grade_value: grade.grade_value,
  grade_date: grade.grade_date,
  student_id: grade.student_id,
  course_id: grade.course_id,

  student: grade.student
    ? {
        id: grade.student.student_id,
        first_name: grade.student.first_name,
        last_name: grade.student.last_name,
      }
    : null,

  course: grade.course
    ? {
        id: grade.course.course_id,
        name: grade.course.course_name,
      }
    : null,
});

export const gradesListDTO = (grades) => grades.map(gradeDTO);

// ✅ INPUT DTOs
export const createGradeInputDTO = (body) => ({
  student_id: body.student_id,
  course_id: body.course_id,
  grade_value: body.grade_value,
  grade_date: body.grade_date,
});

export const updateGradeInputDTO = (body) => ({
  student_id: body.student_id,
  course_id: body.course_id,
  grade_value: body.grade_value,
  grade_date: body.grade_date,
});
