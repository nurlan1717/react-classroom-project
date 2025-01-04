import { PlusCircle, Send, Clock, User } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useCreateAssignmentMutation,
  useGetAssignmentsQuery,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../redux/slices/apiSlice";
import { storage } from "../utils/localStorage";
import { useState } from "react";

const Assignment = () => {
  const { taskId } = useParams();
  const { data: tasks, isLoading } = useGetTasksQuery();
  const userRole = storage.getUserRole();
  const userId = storage.getUserId();
  const [createAssignment] = useCreateAssignmentMutation();
  const [udaptedTask] = useUpdateTaskMutation();
  const { data: assignments } = useGetAssignmentsQuery();


  const [url, setUrl] = useState("");
  const isStudent = userRole === "student";

  const task = tasks?.find((t) => t.id === taskId);

  const payload = {
    id: `a${assignments?.length + 1}`,
    taskId,
    studentId: userId,
    url,
    assignDate: new Date().toISOString(),
    status: "submitted",
    feedback: "",
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      createAssignment(payload);
      udaptedTask({ id: payload.taskId, assignments: [payload.id] });
      alert("salam");
    } else {
      alert("Please enter a URL.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tasks) {
    return <div>No tasks found.</div>;  
  }

  return (
    <div className="w-2/6 h-fit bg-gray-100 rounded-3xl p-3 mr-8 mt-16">
      <div className="max-w-sm mx-auto space-y-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {task.title}
          </h1>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>Deadline </span>
            <div className="text-sm">: {formatDate(task.deadline)}</div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-3 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <PlusCircle className="w-6 h-6 text-blue-500" />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={handleUrlChange}
              className="flex-1 text-gray-800 placeholder-gray-400 bg-transparent border-none focus:ring-0 text-lg"
            />
            <button
              type="submit"
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Comment</h2>
          </div>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Coming Soon!"
              disabled={isStudent}
              className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
