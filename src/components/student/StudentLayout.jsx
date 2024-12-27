import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const StudentLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
