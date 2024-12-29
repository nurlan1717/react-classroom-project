import { useGetClassesQuery, useGetUsersQuery } from "../redux/slices/apiSlice";
import { storage } from "./localStorage";

export const usersObject = () => {
  const { data: users } = useGetUsersQuery();
  const userId = storage.getUserId();

  const userObject = users?.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
  const user = userObject?.[userId];

  return user;
};
export const classesObject = () => {
  const { data: classes } = useGetClassesQuery();

  const classObject = classes?.reduce((acc, classItem) => {
    acc[classItem.id] = classItem;
    return acc;
  }, {});

  return classObject;
};
