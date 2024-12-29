import React from "react";
import {
  useGetTasksQuery,
  useGetMaterialsQuery,
  useGetClassesQuery,
} from "../redux/slices/apiSlice";
import { Calendar, MoreVertical } from "lucide-react";
import { classesObject } from "../utils/usersObject";
import ClassNavbar from "./ClassNavbar";

const Tape = () => {
  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery();
  const { data: classes } = useGetClassesQuery();
  const { data: materials, isLoading: materialsLoading } =
    useGetMaterialsQuery();
  const classesss = classesObject();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (tasksLoading || materialsLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <>
      <ClassNavbar />
      <div className="flex-c">
        <div></div>
        <div>
          <div className="flex-1 max-w-4xl mt-7">
            <div className="relative h-48 bg-slate-600 rounded-lg overflow-hidden mb-6">
              <div className="absolute bottom-6 left-6">
                <h1 className="text-4xl font-bold text-white">SALAM</h1>
              </div>
              <div className="absolute top-4 right-4">
                <button className="text-white hover:bg-white/10 p-2 rounded-full">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Meet</h2>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Join
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Expected</h2>
                <p className="text-gray-600 text-sm mb-4">
                  You don't have any assignments to turn in next week.
                </p>
                <button className="text-blue-500 hover:text-blue-600">
                  See all
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[...tasks, ...materials]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <Calendar size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {item.author || "Teacher"} added{" "}
                            {item.type === "task" ? "a task" : "material"}:{" "}
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tape;
