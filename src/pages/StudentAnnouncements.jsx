import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnnouncementsQuery } from '../redux/slices/apiSlice';

const StudentAnnouncements = () => {
  const { id: classId } = useParams();
  const { data: announcements, isLoading } = useGetAnnouncementsQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const classAnnouncements = announcements?.filter(ann => ann.classId === classId) || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Class Announcements</h1>
      
      <div className="space-y-4">
        {classAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
            <p className="text-gray-600 mb-4">{announcement.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(announcement.date).toLocaleDateString()}
            </p>
          </div>
        ))}
        
        {classAnnouncements.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No announcements yet
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAnnouncements;