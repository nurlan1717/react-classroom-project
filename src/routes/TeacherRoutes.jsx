import { Routes, Route } from "react-router-dom";
import TeacherLayout from "../components/teacher/TeacherLayout";
import NotFound from "../pages/NotFound";
import { ProtectedRouteTeacher } from "./ProtectedRoute";
import Teacher from "../components/teacher/Teacher";
import Job from "../pages/Job";
import TapeDetails from "../pages/TapeDetails";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRouteTeacher>
            <TeacherLayout />
          </ProtectedRouteTeacher>
        }
      >
        <Route path="/" element={<Teacher />} />
        <Route>
          <Route path="class/:id" element={<TapeDetails />} />
          <Route path="class/:id/job" element={<Job />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
