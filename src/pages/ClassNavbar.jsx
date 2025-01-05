import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../utils/localStorage";
import { useTranslation } from "react-i18next";

const ClassNavbar = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const userRole = storage.getUserRole();

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (id) {
      navigate(`/${userRole}/class/${id}`);
    }
  };

  const handleNavigate2 = () => {
    if (id) {
      navigate(`/${userRole}/class/${id}/job`);
    }
  };

  const handleNavigate3 = () => {
    if (id) {
      navigate(`/${userRole}/class/${id}/users`);
    }
  };

  const handleNavigate5 = () => {
    if (id) {
      navigate(`/teacher/class/${id}/announcements`);
    }
  };

  const handleNavigate6 = () => {
    if (id) {
      navigate(`/student/class/${id}/announcements`);
    }
  };

  const handleNavigate0 = () => {
    if (id) {
      navigate(`/${userRole}`);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex text-lg space-x-4">
                <button
                  onClick={handleNavigate0}
                  className="text-gray-600 hover:text-violet-600"
                >
                  {t("classNavbar.home")}
                </button>
                <button
                  onClick={handleNavigate}
                  className="text-gray-600 hover:text-violet-600"
                >
                   {t("classNavbar.tape")}
                </button>
                <button
                  onClick={handleNavigate2}
                  className="text-gray-600 hover:text-violet-600"
                >
                   {t("classNavbar.tasks")}
                </button>
                <button
                  onClick={handleNavigate5}
                  className={`text-gray-600 hover:text-violet-600 ${
                    userRole === "student" ? "hidden" : ""
                  }`}
                >
                   {t("classNavbar.announcments")}
                </button>
                <button
                  onClick={handleNavigate6}
                  className={`text-gray-600 hover:text-violet-600 ${
                    userRole === "teacher" ? "hidden" : ""
                  }`}
                >
                   {t("classNavbar.announcments")}
                </button>
                <button
                  onClick={handleNavigate3}
                  className="text-gray-600 hover:text-violet-600"
                >
                   {t("classNavbar.users")}
                </button>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
          </div>
        </div>
        <hr className="border-t border-gray-200" />
      </div>
    </>
  );
};

export default ClassNavbar;
