import { Routes, Route } from "react-router-dom";
import StudentLayout from "../components/student/StudentLayout";
import NotFound from "../pages/NotFound";
import Student from "../components/student/Student";
import ProtectedRouteStudent from "./ProtectedRoute";
import UserDetails from "../pages/UserDetails";
import Calendar from "../components/Calendar";
import Job from "../pages/Job";
import TapeDetails from "../pages/TapeDetails";
import User from "../pages/Users";
import Messages from "../pages/Messages";
import MaterialItem from "../pages/MaterialItem";
import TaskDetails from "../pages/TaskDetails";
import Setting from "../pages/Setting";
import StudentAnnouncements from "../pages/StudentAnnouncements";
import VideoRoom from "../components/VideoRoom";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRouteStudent>
            <StudentLayout />
          </ProtectedRouteStudent>
        }
      >
        <Route path="/" element={<Student />} />
        <Route>
          <Route path="calendar" element={<Calendar />} />
          <Route path="class/:id" element={<TapeDetails />} />
          <Route path="class/:id/job" element={<Job />} />
          <Route path="class/:id/job/:taskId" element={<TaskDetails />} />
          <Route path="class/:id/users" element={<User />} />
          <Route path="class/:id/announcements" element={<StudentAnnouncements />} />
          <Route path="class/:id/room/:roomId" element={<VideoRoom />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="messages" element={<Messages />} />
          <Route path="material" element={<MaterialItem />} />
          <Route path="settings" element={<Setting />} />


        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
