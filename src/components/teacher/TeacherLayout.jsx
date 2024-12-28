import { Outlet } from "react-router-dom";
import Navbar from "../student/Navbar";
import Sidebar from "../Sidebar";

const TeacherLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
