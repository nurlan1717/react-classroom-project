import { Outlet } from "react-router-dom";
import Navbar from "../student/Navbar";
import Sidebar from "../Sidebar";

const TeacherLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex gap-10">
        <Sidebar />
        <div className="flex-c w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
