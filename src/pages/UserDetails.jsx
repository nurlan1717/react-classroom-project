import React from 'react';
import { useSelector } from 'react-redux';


const UserDetails = () => {
  const user = useSelector((state) => state.user.currentUser);

  const TeacherDetails = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user?.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mt-2">
              Teacher
            </span>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Major</p>
              <p className="font-medium">{user?.major}</p>
            </div>
            <div>
              <p className="text-gray-600">Bio</p>
              <p className="font-medium">{user?.bio}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-6">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          <div className="flex space-x-4">
            {user?.socialLinks?.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                LinkedIn
              </a>
            )}
            {user?.socialLinks?.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const StudentDetails = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user?.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mt-2">
              Student
            </span>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Major</p>
              <p className="font-medium">{user?.major}</p>
            </div>
            <div>
              <p className="text-gray-600">Overall Grade</p>
              <p className="font-medium">{user?.overallGrade || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Grades</h2>
          <div className="space-y-4">
            {user?.grades?.map((grade) => (
              <div key={grade.taskId} className="flex justify-between items-center">
                <span className="text-gray-600">Task {grade.taskId}</span>
                <span className="font-medium">{grade.grade}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return user?.role === 'teacher' ? <TeacherDetails /> : <StudentDetails />;
};

export default UserDetails;