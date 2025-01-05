import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTasksQuery, useGetClassesQuery } from "../redux/slices/apiSlice";
import { Calendar, MoreVertical } from "lucide-react";
import ClassNavbar from "./ClassNavbar";
import { storage } from "../utils/localStorage";
import { Helmet } from "react-helmet-async";
import CreateMeeting from "../components/CreateMeeting";
import { useTranslation } from 'react-i18next';

const Tape = () => {
  const {t} = useTranslation();
  const { id } = useParams();
  const userRole = storage.getUserRole();
  const navigate = useNavigate();

  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery();
  const { data: classes, isLoading: classesLoading } = useGetClassesQuery();

  if (tasksLoading || classesLoading) {
    return <div className="p-4">Loading...</div>;
  }

  const filteredTasks = tasks ? tasks.filter((x) => `:${x.classId}` === id) : [];
  const filteredClasses = classes ? classes.filter((x) => `:${x.id}` === id) : [];

  if (filteredClasses.length === 0) {
    return <div>No class found for this id.</div>;
  }

  const handleTaskClick = (taskId) => {
    navigate(`/${userRole}/class/${id}/job/${taskId}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>{filteredClasses[0]?.name}</title>
        <meta name="description" content="Classroom" />
        <meta name="author" content="Nurlan, Qerib" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="src/assets/image/google-classroom-icon.png" />
      </Helmet>
      <ClassNavbar />
      <div className="flex flex-col mx-auto px-4">
        <div className="relative w-full max-w-5xl mt-4 h-48 bg-gray-600 rounded-md overflow-hidden shadow-lg mb-6">
          <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl font-bold text-white">{filteredClasses[0]?.name}</h1>
          </div>
          <div className="absolute top-4 right-4">
            <button
              className="text-white hover:bg-white/10 p-2 rounded-full transition duration-200"
              aria-label="More options"
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-1 bg-white p-5 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2 mt-2">
              <h2 className="text-xl font-semibold">{t("tape.videoMeeting")}</h2>
              <button>
                <MoreVertical size={20} />
              </button>
            </div>
            <CreateMeeting classId={id} />
          </div>

          <div className="col-span-2 w-5/6 space-y-4">
            {[...filteredTasks]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleTaskClick(item.id);
                  }}
                  className="pointer bg-white p-4 rounded-lg shadow-md flex items-start gap-4 transition duration-150 hover:shadow-lg transform hover:scale-105"
                >
                  <div className="pointer w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="pointer flex items-center justify-between">
                      <div>
                        <p className="pointer font-semibold">
                        {t("tape.teacherAddedTask")} {item.title}
                        </p>
                        <p className="pointer text-sm text-gray-500">
                        {t("tape.created")} {formatDate(item.createdAt)}
                        </p>
                        <p className="text-sm text-gray-500">
                        {t("tape.deadline")}  {formatDate(item.deadline)}
                        </p>
                      </div>
                      <button
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                        aria-label="More options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tape;