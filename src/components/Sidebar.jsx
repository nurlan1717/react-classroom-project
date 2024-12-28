import React, { useState } from "react";
import {
  Home,
  Calendar,
  GraduationCap,
  ClipboardList,
  Archive,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import {
  useGetClassesQuery,
  useGetAssignmentsQuery,
} from "../redux/slices/apiSlice";
import { useSelector } from "react-redux";
import Student from "./student/Student";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [menuState, setMenuState] = useState({
    isOpen: true,
    coursesExpanded: true,
    assignmentsExpanded: false,
  });

  const toggleMenu = (key) => {
    setMenuState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { data: classes = [], isLoading: classesLoading } =
    useGetClassesQuery();
  const { data: assignments = [], isLoading: assignmentsLoading } =
    useGetAssignmentsQuery();

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, title: "Home Page", path: "/" },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Calendar",
      path: "/calendar",
    },
  ];

  return (
    <>
      <div
        className={`h-screen bg-white transition-all duration-300 ${
          menuState.isOpen ? "w-64" : "w-16"
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
            <span className="ml-4 text-xl text-purple-600">Class</span>
          )}
        </div>

        <div className="py-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer"
            >
              <div className="text-gray-600">{item.icon}</div>
              {menuState.isOpen && <span className="ml-4">{item.title}</span>}
            </div>
          ))}

          <div>
            <div
              className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer"
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
                  classes.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer"
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${
                          course.color || "bg-blue-500"
                        } flex items-center justify-center text-white`}
                      >
                        {course.title?.[0] || "C"}
                      </div>
                      <span className="ml-4">{course.title}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div>
            <div
              className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer"
              onClick={() => toggleMenu("assignmentsExpanded")}
            >
              <div className="text-gray-600">
                <ClipboardList className="w-5 h-5" />
              </div>
              {menuState.isOpen && (
                <>
                  <span className="ml-4 flex-1">Assignments</span>
                  {menuState.assignmentsExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </>
              )}
            </div>
            {menuState.isOpen && menuState.assignmentsExpanded && (
              <div className="ml-4">
                {assignmentsLoading ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-purple-500"></div>
                  </div>
                ) : assignments.length === 0 ? (
                  <div className="px-4 py-2.5 text-gray-500">
                    No assignments available.
                  </div>
                ) : (
                  assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-start px-4 py-2.5 hover:bg-blue-100 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white">
                        {assignment.id || "A"}
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900">
                          Task: {assignment.taskId}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Status: {assignment.status}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Feedback: {assignment.feedback}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer">
              <div className="text-gray-600">
                <Archive className="w-5 h-5" />
              </div>
              {menuState.isOpen && <span className="ml-4">Course Archive</span>}
            </div>
            <div className="flex items-center px-4 py-2.5 hover:bg-blue-100 cursor-pointer">
              <div className="text-gray-600">
                <Settings className="w-5 h-5" />
              </div>
              {menuState.isOpen && <span className="ml-4">Settings</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
