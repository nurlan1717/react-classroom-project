import { storage } from "./localStorage";

const isAuthenticatedStudent = () => {
  return storage.getUserRole() === "student";
};

export default isAuthenticatedStudent;
