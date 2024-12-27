import { Routes, Route } from "react-router-dom";
import TeacherLayout from "../components/teacher/TeacherLayout";
import Login from "../pages/Login"; 
import NotFound from "../pages/NotFound"; 

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
