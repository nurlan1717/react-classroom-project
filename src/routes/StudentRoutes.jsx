import { Routes, Route } from "react-router-dom";
import StudentLayout from "../components/student/StudentLayout";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
