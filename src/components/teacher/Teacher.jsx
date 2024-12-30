import React, { useEffect } from "react";
import { useGetClassesQuery } from "../../redux/slices/apiSlice";
import { storage } from "../../utils/localStorage";
import { FolderOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";


const Teacher = () => {
  const { data: classes } = useGetClassesQuery();
  const userId = storage.getUserId();

  const filteredCourses = classes?.filter(
    (course) => course.teacherId == userId
  );

  return (
    <div className="flex flex-wrap gap-6 justify-start w-full h-1/2 mt-7">
      {filteredCourses && filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <div
            key={course.id}
            className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-32 bg-slate-600 p-6">
              <div className="absolute top-4 right-4">
                <button className="text-white/80 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="18" r="2" />
                  </svg>
                </button>
              </div>
              <Link
                to={`class/:${course.id}`}
                className="text-2xl font-bold text-white z-50"
              >
                {course.name}
              </Link>
              <p className="text-white/80 text-sm mt-1 z-50">Class Room</p>
            </div>

            <div className="relative px-6">
              <div className="absolute -top-8">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">C</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-12">
              <h4 className="text-lg font-semibold text-gray-700">Scheduled:</h4>
              {course.schedule?.map((item, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {`${item.day} - ${item.time}`}
                </p>
              ))}

              <h4 className="text-lg font-semibold text-gray-700 mt-4">
                Enrolled Students:
              </h4>
              <ul className="list-disc pl-5">
                {course.enrolledStudents?.map((student) => (
                  <li key={student.id} className="text-sm text-gray-600">
                    {student.fullName}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Users className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <FolderOpen className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center text-gray-600">
          <p className="text-lg font-semibold">
            There are no classes available. Please create a new class or join an existing one.
          </p>
          <img className="mx-auto" src="src/assets/image/sad-figure.png" alt="" />
        </div>
      )}
    </div>

  );
};

export default Teacher;
