import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateUserModal from "./UpdateUserModal";
import { Helmet } from "react-helmet-async";

const UserDetails = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const values = user?.grades
    ? user.grades.map((grade) => Number(grade.value))
    : [];
  const sum = values.reduce((acc, current) => acc + current, 0);
  const average = values.length > 0 ? sum / values.length : 0;

  const TeacherDetails = () => (
    <>
      <Helmet>
        <title>{user?.fullName || "Teacher"}</title>
        <meta name="description" content="Classroom" />
        <meta name="author" content="Nurlan, Qerib" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/image/google-classroom-icon.png" />
      </Helmet>
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              <img
                src={user?.profileImage || "https://via.placeholder.com/150"}
                alt={user?.fullName || "Profile"}
                className="w-32 h-32 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.fullName || "No Name Available"}
                </h1>
                <p className="text-gray-600">
                  {user?.email || "No Email Provided"}
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                  Teacher
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
            >
              Update Information
            </button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Professional Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Major</p>
                <p className="font-medium">
                  {user?.major || "No Major Available"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Bio</p>
                <p className="font-medium">{user?.bio || "No Bio Available"}</p>
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
    </>

  );

  const StudentDetails = () => (
    <>
      <Helmet>
        <title>{user?.fullName || "Student"}</title>
        <meta name="description" content="Classroom" />
        <meta name="author" content="Nurlan, Qerib" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/image/google-classroom-icon.png" />
      </Helmet>
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              <img
                src={user?.profileImage || "https://via.placeholder.com/150"}
                alt={user?.fullName || "Profile"}
                className="w-32 h-32 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.fullName || "No Name Available"}
                </h1>
                <p className="text-gray-600">
                  {user?.email || "No Email Provided"}
                </p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                  Student
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Information
            </button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Bio</h2>
            <p className="text-gray-700">
              {user?.bio || "No bio"}
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Major</p>
                <p className="font-medium">
                  {user?.major || "No Major Available"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Overall Grade</p>
                <p className="font-medium">{`${average}%` || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Grades</h2>
            <div className="space-y-4">
              {user?.grades?.map((grade, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-600">Class {grade?.classId} Task : {grade?.taskId} </span>
                  <span className="font-medium">{grade?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {user?.role === "teacher" ? <TeacherDetails /> : <StudentDetails />}
      <UpdateUserModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default UserDetails;
