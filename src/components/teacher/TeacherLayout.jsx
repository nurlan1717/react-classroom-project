import { Outlet } from "react-router-dom";

const TeacherLayout = () => {
  return (
    <div>
      <header>
        <h1>Öğretmen Paneli</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
