import { Routes, Route } from "react-router-dom";
import TeacherLayout from "../components/teacher/TeacherLayout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import RegistrationForm from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRole="teacher" />}>
        <Route path="/" element={<TeacherLayout />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
