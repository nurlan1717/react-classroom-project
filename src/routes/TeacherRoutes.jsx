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
import Messages from "../pages/Messages";
import Setting from "../pages/Setting";
import TaskDetails from "../pages/TaskDetails";
import Grades from "../pages/Grades";
import Announcements from "../pages/Announcements";
import VideoRoom from "../components/VideoRoom";
import InviteUser from "../pages/InviteUser";

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
          <Route path="class/:id/invite" element={<InviteUser />} />
          <Route path="class/:id/job" element={<Job />} />
          <Route path="class/:id/grades" element={<Grades />} />
          <Route path="class/:id/users" element={<User />} />
          <Route path="class/:id/job/:taskId" element={<TaskDetails />} />
          <Route path="class/:id/announcements" element={<Announcements />} />
          <Route path="class/:id/room/:roomId" element={<VideoRoom />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="create-class" element={<AddClass />} />
          <Route path="messages" element={<Messages />} />
          <Route path="material" element={<MaterialItem />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
