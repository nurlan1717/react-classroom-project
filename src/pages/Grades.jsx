import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ClassNavbar from "./ClassNavbar";
import {
  useGetAssignmentsQuery,
  useGetClassesQuery,
  useGetTasksQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../redux/slices/apiSlice";

const Grades = () => {
  const { id } = useParams();
  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery();
  const { data: classes, isLoading: classesLoading } = useGetClassesQuery();
  const { data: assignments } = useGetAssignmentsQuery();
  const { data: users } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const [students, setStudents] = useState([]);

  const currentClass = classes?.find((cls) => `:${cls.id}` === id);
  const currentTasks = tasks?.filter((task) => `:${task.classId}` === id);

  useEffect(() => {
    if (currentClass) {
      const classStudents = users?.filter((user) => currentClass?.studentIds?.includes(user.id));
      setStudents(
        classStudents?.map((student) => ({
          ...student,
          grade: student.grades?.find((grade) => grade.classId === currentClass.id)?.value || "",
          assignment: assignments?.find((assign) => assign.studentId === student.id) || null,
        }))
      );
    }
  }, [currentClass, users, assignments]);

  const handleGradeChange = (studentId, newGrade) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, grade: newGrade } : student
      )
    );
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(
        students.map((student) =>
          updateUser({
            id: student.id,
            grades: [
              ...(student.grades || []),
              { classId: currentClass.id, value: student.grade },
            ],
          })
        )
      );
      alert("Qiymətlər uğurla qeyd edildi!");
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      alert("Qiymətləri qeyd etmək mümkün olmadı!");
    }
  };

  if (tasksLoading || classesLoading) {
    return <div>Loading...</div>;
  }

  if (!currentClass) {
    return <div>No found class!</div>;
  }

  return (
    <>
      <Helmet>
        <title>Grades</title>
        <meta name="description" content="Classroom" />
        <meta name="author" content="Nurlan, Qerib" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="src/assets/image/google-classroom-icon.png" />
      </Helmet>
      <ClassNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {currentClass?.name} Class - Grades
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Student</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{student.username}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.assignment ? (
                    <a
                      href={student.assignment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Task {student.assignment.taskId}
                    </a>
                  ) : (
                    "No tasks"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.assignment?.status || "No status"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={student.grade || ""}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
        >
          Note the prices
        </button>
      </div>
    </>
  );
};

export default Grades;
