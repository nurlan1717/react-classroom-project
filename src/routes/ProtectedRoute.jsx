import { Navigate } from "react-router-dom";
import isAuthenticatedStudent from "../utils/isAuthenticatedStudent.js";
import isAuthenticatedTeacher from "../utils/isAuthenticatedTeacher.js";

const ProtectedRouteStudent = ({ children }) => {
  return isAuthenticatedStudent() ? children : <Navigate to="/login" replace />;
};
export const ProtectedRouteTeacher = ({ children }) => {
  return isAuthenticatedTeacher() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRouteStudent;
