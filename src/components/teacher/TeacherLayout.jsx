import { Outlet } from "react-router-dom";
import Navbar from "../student/Navbar";
import Sidebar from "../Sidebar";

const TeacherLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex gap-10">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
