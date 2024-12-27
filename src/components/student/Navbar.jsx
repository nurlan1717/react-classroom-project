import React from "react";
import { useGetUsersQuery } from "../../redux/slices/apiSlice";
import { storage } from "../../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();
    const userId = storage.getUserId();

    if (!userId) {
        return null;
    }

    if (isLoading) return null;
    if (error) return null;

    const usersObject = users?.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    }, {});

    const user = usersObject?.[userId];

    const handleLogout = () => {
        storage.clearUserAuth();
        Window.location.reload()
    };

    return (
        <nav className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-md hover:bg-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <span className="text-xl font-semibold text-gray-700">Class</span>
            </div>

            <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700">Welcome: {user?.username}</span>
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <img
                        src={user?.profileImage || "https://via.placeholder.com/32"}
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full"
                    />
                </button>
                <Link to="/Login" onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-200">
                    <span>Logout</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
