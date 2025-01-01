import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from "../redux/slices/apiSlice";
import { useSelector } from "react-redux";
import { MoreVertical, Plus, X, Calendar, Trash } from "lucide-react";
import ClassNavbar from "./ClassNavbar";
import RichTextEditor from "../components/RichTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Job = () => {
  const classId = useParams();
  const id = classId.id.slice(1);
  const [selectedTopic, setSelectedTopic] = useState("All topics");
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    deadline: new Date().toISOString().split('T')[0],
    type: "homework",
    classId: id || "",
  });

  const currentUser = useSelector((state) => state.user.currentUser);
  const isTeacher = currentUser?.role === "teacher";

  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useGetTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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


  const filteredTasks = tasks?.filter((task) => `:${task.classId}` === classId.id);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const taskData = {
        ...newTask,
        deadline: selectedDate.toISOString(),
      };
      await createTask(taskData).unwrap();
      setIsCreatingTask(false);
      setNewTask({
        title: "",
        description: "",
        category: "",
        deadline: new Date().toISOString().split('T')[0],
        type: "homework",
        classId: id || "",
      });
      refetch();
    } catch (error) {
      console.error("error ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId).unwrap();
      refetch();
    } catch (error) {
      console.error("error", error);
    }
  };

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
            <h1 className="text-xl font-medium">Tasks</h1>
            {isTeacher && (
              <button
                onClick={() => setIsCreatingTask(true)}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Create Task</span>
              </button>
            )}
          </div>
        </div>

        {isCreatingTask && isTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-medium">Create Task</h2>
                <button
                  onClick={() => setIsCreatingTask(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="p-4 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <RichTextEditor
                    content={newTask.description}
                    onChange={(content) => setNewTask({ ...newTask, description: content })}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <select
                      value={newTask.category}
                      onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Homework">Homework</option>
                      <option value="Assignment">Assignment</option>
                      <option value="Project">Project</option>
                      <option value="Quiz">Quiz</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <div className="relative">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        dateFormat="MMMM d, yyyy"
                        minDate={new Date()}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTask(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${isSubmitting ? 'opacity-50' : 'hover:bg-blue-700'
                      }`}
                  >
                    {isSubmitting ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
              ([category, categoryTasks]) =>
                (selectedTopic === "All topics" || selectedTopic === category) && (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-medium">{category}</h2>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical size={20} />
                      </button>
                    </div>

                    {filteredTasks.map((task) => (
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
                          {isTeacher && (
                            <button
                              className="p-2 hover:bg-gray-100 rounded-full"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              <Trash size={20} />
                            </button>
                          )}
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
