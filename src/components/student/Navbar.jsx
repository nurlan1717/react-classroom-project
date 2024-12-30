import React from "react";
import { storage } from "../../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MessageSquare } from "lucide-react";
import { useGetInvitationsQuery } from "../../redux/slices/apiSlice";

const Navbar = () => {
  const userId = storage.getUserId();
  const userRole = storage.getUserRole();
  const navigate = useNavigate();
  const { data: invitations } = useGetInvitationsQuery();

  const pendingInvitations = invitations?.filter(
    (invitation) => invitation.studentId === userId && invitation.status === "pending"
  );

  const pendingCount = pendingInvitations?.length;

  if (!userId) {
    return null;
  }

  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    storage.clearUserAuth();
    window.location.reload();
  };

  const handleProfileClick = () => {
    navigate(`/${userRole}/user-details`);
  };

  const handleMessage = () => {
    navigate(`/${userRole}/messages`);
  };

  return (
    <nav className="flex items-center justify-between bg-white p-4 border-b-2">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-200">
          <span className="text-xl font-semibold text-gray-700">ClassCraft</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={handleMessage} className="relative">
          <MessageSquare />
          {pendingCount > 0 && (
            <span className="absolute top-0 right-0 text-xs text-white bg-violet-700 rounded-full w-4 h-3 flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>
        <span className="font-medium text-gray-700">{user?.username}</span>

        <button
          onClick={handleProfileClick}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <img
            src={user?.profileImage || "https://via.placeholder.com/32"}
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
        </button>
        <Link
          to="/Login"
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <span className="text-violet-700 font-bold">Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
