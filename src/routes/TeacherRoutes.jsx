import { Routes, Route } from "react-router-dom";
import TeacherLayout from "../components/teacher/TeacherLayout";
import NotFound from "../pages/NotFound";
import { ProtectedRouteTeacher } from "./ProtectedRoute";
import Teacher from "../components/teacher/Teacher";
import Job from "../pages/Job";
import TapeDetails from "../pages/TapeDetails";
import User from "../pages/Users";
import UserDetails from "../pages/UserDetails";
import Calendar from "../components/Calendar";
import AddClass from "../pages/AddClass";
import MaterialItem from "../pages/MaterialItem";

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
          <Route path="calendar" element={<Calendar />} />
          <Route path="class/:id" element={<TapeDetails />} />
          <Route path="class/:id/job" element={<Job />} />
          <Route path="class/:id/users" element={<User />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="create-class" element={<AddClass />} />
          <Route path="material" element={<MaterialItem />} />

        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
