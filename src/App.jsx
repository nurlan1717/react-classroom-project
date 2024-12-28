import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import { Routes, Route } from "react-router-dom";
import { usersObject } from "./utils/usersObject";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { useEffect } from "react";

function App() {
  const user = usersObject();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);
  return (
    <Routes>
      <Route path="/teacher/*" element={<TeacherRoutes />} />
      <Route path="/*" element={<StudentRoutes />} />
    </Routes>
  );
}

export default App;
