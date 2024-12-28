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
    <nav className="flex items-center justify-between bg-violet-200 p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-200">
          <img className="h-10px w-20"
            src="https://store-images.s-microsoft.com/image/apps.21960.14149173573532821.775c48a7-4dfa-4a89-b6f2-942ee8ea3947.6d7afba4-9522-45cd-89e6-014c5f5af456"
            alt=""
          />
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
