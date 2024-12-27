import { Routes, Route } from "react-router-dom";
import TeacherLayout from "../components/teacher/TeacherLayout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import RegistrationForm from "../pages/Register";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherLayout />}>
        <Route index element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
