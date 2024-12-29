import React, { useState } from "react";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from "../redux/slices/apiSlice";
import { MoreVertical, Plus } from "lucide-react";
import ClassNavbar from "./ClassNavbar";

const Job = () => {
  const [selectedTopic, setSelectedTopic] = useState("All topics");
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const groupedTasks = tasks?.reduce((acc, task) => {
    const category = task.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {});

  const formatDate = (date) => {
    if (!date) return "No deadline";
    const d = new Date(date);
    return `Completion date: ${d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  return (
    <>
      <ClassNavbar />

      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-medium">Job</h1>
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Plus size={20} />
              <span>Open your profile</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All topics</option>
            {groupedTasks &&
              Object.keys(groupedTasks).map((category) => (
                <option key={category}>{category}</option>
              ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-4">
            Error loading tasks
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTasks || {}).map(
              ([category, categoryTasks]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-medium">{category}</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  {categoryTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">
                            {task.type || "homework"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(task.deadline)}
                        </span>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full"
                          onClick={() => deleteTask(task.id)}
                        >
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Job;
