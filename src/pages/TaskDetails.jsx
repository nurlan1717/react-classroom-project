import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTasksQuery, useUpdateTaskMutation } from '../redux/slices/apiSlice';
import { Calendar, ArrowLeft } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RichTextEditor from '../components/RichTextEditor';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
  const { taskId, id: classId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isTeacher = currentUser?.role === "teacher";

  const { data: tasks, isLoading } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();

  const task = tasks?.find(t => t.id === taskId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [selectedDate, setSelectedDate] = useState(
    task ? new Date(task.deadline) : new Date()
  );

  const createMarkup = (html) => {
    return { __html: html };
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => navigate(`/teacher/class/${classId}/job`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Tasks
        </button>
        <div>Task not found</div>
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      await updateTask({
        id: taskId,
        updatedData: {
          ...editedTask,
          deadline: selectedDate.toISOString()
        }
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate(`/teacher/class/${classId}/job`)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Tasks
      </button>

      {isEditing && isTeacher ? (
        <div className="space-y-6">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full text-2xl font-bold p-2 border rounded-lg"
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <RichTextEditor
              content={editedTask.description}
              onChange={(content) => setEditedTask({ ...editedTask, description: content })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={editedTask.category}
              onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Homework">Homework</option>
              <option value="Assignment">Assignment</option>
              <option value="Project">Project</option>
              <option value="Quiz">Quiz</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full p-2 border rounded-lg"
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{task.title}</h1>
            {isTeacher && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
              >
                Edit Task
              </button>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-2">Deadline</div>
            <div className="text-lg">{formatDate(task.deadline)}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-2">Category</div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              {task.category}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-2">Description</div>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={createMarkup(task.description)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;