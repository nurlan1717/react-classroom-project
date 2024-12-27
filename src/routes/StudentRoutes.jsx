import { Routes, Route } from "react-router-dom";
import StudentLayout from "../components/student/StudentLayout";
import NotFound from "../pages/NotFound";
import RegistrationForm from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRole="student" />}>
        <Route path="/" element={<StudentLayout />}>
          <Route index element={<RegistrationForm />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
