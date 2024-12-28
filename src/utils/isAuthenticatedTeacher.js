import { storage } from "./localStorage";

const isAuthenticatedTeacher = () => {
  return storage.getUserRole() === "teacher";
};

export default isAuthenticatedTeacher;
