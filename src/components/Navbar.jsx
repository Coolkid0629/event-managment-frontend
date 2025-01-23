import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#f2f2f2] text-black w-full fixed top-0 left-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold px-2">
              SANGAM
            </Link>
          </div>
          <div className="hidden sm:flex space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transform transition duration-300 hover:-translate-y-1"
            >
              Home
            </Link>
            <Link
              to="/events/create"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transform transition duration-300 hover:-translate-y-1"
            >
              Create Event
            </Link>
            <Link
              to="/events"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transform transition duration-300 hover:-translate-y-1"
            >
              All Events
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-3 py-2 rounded-md text-sm font-medium border border-black hover:bg-black hover:text-white transform transition duration-300 hover:-translate-y-1"
            >
              Login
            </Link>
            <button
              className="sm:hidden px-3 py-2 rounded-md text-sm font-medium border border-black hover:bg-black hover:text-white transform transition duration-300 hover:-translate-y-1"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/events/create"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200"
                onClick={toggleMenu}
              >
                Create Event
              </Link>
              <Link
                to="/events"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200"
                onClick={toggleMenu}
              >
                All Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
