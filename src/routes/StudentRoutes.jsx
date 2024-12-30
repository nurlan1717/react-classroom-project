import { Routes, Route } from "react-router-dom";
import StudentLayout from "../components/student/StudentLayout";
import NotFound from "../pages/NotFound";
import RegistrationForm from "../pages/Register";
import Login from "../pages/Login";
import Student from "../components/student/Student";
import ProtectedRouteStudent from "./ProtectedRoute";
import UserDetails from "../pages/UserDetails";

const StudentRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRouteStudent>
              <StudentLayout />
            </ProtectedRouteStudent>
          }
        >
          <Route path="student" element={<Student />} />
          <Route path="user-details" element={<UserDetails />} />
        </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default StudentRoutes;
