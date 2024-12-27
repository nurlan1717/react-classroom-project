import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/teacher/*" element={<TeacherRoutes />} />
      <Route path="/*" element={<StudentRoutes />} />
    </Routes>
  );
}

export default App;
