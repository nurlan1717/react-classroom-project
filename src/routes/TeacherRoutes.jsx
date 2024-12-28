import { Routes, Route } from "react-router-dom";
import TeacherLayout from "../components/teacher/TeacherLayout";
import NotFound from "../pages/NotFound";
// import Login from "../pages/Login";
// import RegistrationForm from "../pages/Register";
import { ProtectedRouteTeacher } from "./ProtectedRoute";
import Teacher from "../components/teacher/Teacher";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route
        path="/teacher"
        element={
          <ProtectedRouteTeacher>
            <TeacherLayout />
          </ProtectedRouteTeacher>
        }
      >
        <Route index element={<Teacher />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
