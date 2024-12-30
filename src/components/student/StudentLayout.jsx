import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar";

const StudentLayout = () => {
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

export default StudentLayout;
