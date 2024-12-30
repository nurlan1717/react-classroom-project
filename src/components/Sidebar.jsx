import React, { useState } from "react";
import {
  Home,
  Calendar,
  GraduationCap,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  Newspaper,
} from "lucide-react";
import { useGetClassesQuery, useGetUsersQuery } from "../redux/slices/apiSlice";
import { useSelector } from "react-redux";
import { storage } from "../utils/localStorage";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [menuState, setMenuState] = useState({
    isOpen: true,
    coursesExpanded: true,
  });

  const toggleMenu = (key) => {
    setMenuState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { data: classes = [], isLoading: classesLoading } = useGetClassesQuery();
  const { data: users } = useGetUsersQuery();
  const userId = storage.getUserId();
  const userRole = storage.getUserRole();

  const filteredCourses = classes?.filter(
    (course) => course.teacherId == userId
  );

  const filteredCoursesStudent = classes
    ?.filter((course) => course.studentIds.includes(userId))
    .map((course) => {
      const enrolledStudents = users?.filter((user) =>
        course.studentIds.includes(user.id)
      );
      return { ...course, enrolledStudents };
    });

  const menuItems = [
    {
      icon: <Home className="w-5 h-5" />,
      title: "Home Page",
      path: "/",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Calendar",
      path: `/${userRole}/calendar`,
    },
  ];

  return (
    <>
      <div
        className={`h-screen bg-white transition-all duration-300 ${menuState.isOpen ? "w-64" : "w-16"
          } border-r border-gray-300`}
      >
        <div className="h-14 flex items-center px-4 border-b border-gray-300">
          <button
            onClick={() => toggleMenu("isOpen")}
            className="p-1.5 hover:bg-purple-100 rounded-full"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          {menuState.isOpen && (
            <span className="ml-4 text-xl text-purple-800">Class</span>
          )}
        </div>

        <div className="py-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer text-violet-800"
                  : "flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer hover:text-violet-500"
              }
            >
              <div className="text-gray-600">{item.icon}</div>
              {menuState.isOpen && <span className="ml-4">{item.title}</span>}
            </NavLink>
          ))}

          <div>
            <div
              className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer hover:text-violet-500"
              onClick={() => toggleMenu("coursesExpanded")}
            >
              <div className="text-gray-600">
                <GraduationCap className="w-5 h-5" />
              </div>
              {menuState.isOpen && (
                <>
                  <span className="ml-4 flex-1">Courses</span>
                  {menuState.coursesExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </>
              )}
            </div>
            {menuState.isOpen && menuState.coursesExpanded && (
              <div className="ml-4">
                {classesLoading ? (
                  <div className="px-4 py-2.5 text-gray-500">
                    Loading classes...
                  </div>
                ) : (
                  (userRole === "student" ? filteredCoursesStudent : filteredCourses).map(
                    (course) => (
                      <NavLink
                        to={`class/:${course.id}`}
                        key={course.id}
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer text-violet-800"
                            : "flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer "
                        }
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${course.color || "bg-blue-500"
                            } flex items-center justify-center text-white`}
                        >
                          {course.name?.[0] || "C"}
                        </div>
                        <span className="ml-2">{course.name}</span>
                      </NavLink>
                    )
                  )
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer hover:text-violet-500">
              <div className="text-gray-600">
                <Settings className="w-5 h-5" />
              </div>
              {menuState.isOpen && <span className="ml-4">Settings</span>}
            </div>
          </div>
          <div>
            {userRole === "teacher" && (
              <div>
                <Link
                  to="create-class"
                  className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer hover:text-violet-500"
                >
                  <div className="text-gray-600">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  {menuState.isOpen && <span className="ml-4">Create Class</span>}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
