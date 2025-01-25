import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const username = localStorage.getItem("username");
  const first_letter = username
    ?.split(" ")
    .map((e) => e[0])
    .join("")
    .toUpperCase();
  const user = localStorage.getItem("access-token");

  return (
    <nav className="w-full h-16 shadow-md bg-gray-100 flex items-center px-6 justify-between">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </Link>
        <span className="text-xl font-semibold italic text-gray-800">
          Quick Note
        </span>
      </div>
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-6">
            {/* Profile Circle */}
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 text-white font-bold cursor-pointer hover:bg-blue-900 transition duration-300"
              title={username}
            >
              {first_letter}
            </div>
            <button
              className="px-4 py-1 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-300"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1 text-sm font-medium text-white bg-blue-800 rounded-full hover:bg-blue-900 transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
