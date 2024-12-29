import React from "react";
import { storage } from "../../utils/localStorage";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userId = storage.getUserId();

  if (!userId) {
    return null;
  }
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    storage.clearUserAuth();
    Window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between bg-white p-4 border-b-2">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-200">
        </button>
        <span className="text-xl font-semibold text-gray-700">ClassCraft</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="font-medium text-gray-700">
          Welcome: {user?.username}
        </span>
        <button className="p-2 rounded-full hover:bg-gray-200">
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
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
