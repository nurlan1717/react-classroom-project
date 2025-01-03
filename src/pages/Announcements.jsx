import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnnouncementsQuery, useCreateAnnouncementsMutation, useDeleteAnnouncementsMutation} from "../redux/slices/apiSlice";

const Announcements = () => {
  const { id: classId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: announcements, isLoading } = useGetAnnouncementsQuery();
  const [createAnnouncement] = useCreateAnnouncementsMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({
        classId,
        title,
        content,
        date: new Date().toISOString()
      });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
    } catch (error) {
      console.error('error:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const classAnnouncements = announcements?.filter(ann => ann.classId === classId) || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Class Announcements</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500"
            rows="4"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors"
        >
          Post Announcement
        </button>
      </form>

      <div className="space-y-4">
        {classAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
                <p className="text-gray-600 mb-4">{announcement.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(announcement.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;