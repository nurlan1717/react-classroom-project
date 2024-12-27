import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div>
      <header>
        <h1>Öğrenci Paneli</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
