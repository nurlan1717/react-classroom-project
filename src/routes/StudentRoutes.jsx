import { Routes, Route } from "react-router-dom";
import StudentLayout from "../components/student/StudentLayout";
import NotFound from "../pages/NotFound";
import RegistrationForm from "../pages/Register";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<RegistrationForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
