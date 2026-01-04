import React,{ use }  from "react";
import { Link, NavLink, Outlet } from "react-router";
import logoImg from '../assets/logoFarm2.jpeg'


import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { FaFileAlt, FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const DashboardLayout = () => {
  const { user } = use(AuthContext);

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="dashboard-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-semibold text-lg">Krishi Farm Dashboard</div>
        </nav>

        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 w-64">
          <ul className="menu w-full grow p-2">
            {/* Logo */}
            <li className="mb-4">
              <Link to="/">
                <img
                  className="w-14 h-14 object-contain mx-auto rounded-full"
                  src={logoImg}
                  alt="Krishi Farm"
                />
              </Link>
            </li>

            {/* User links */}
            {user && (
              <>
                <li>
                  <NavLink to="/dashboard/myProfile">
                    <FaUserCircle className="mr-2" />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myPosts">
                    <FaFileAlt className="mr-2" />
                    My Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myInterests">
                    <FaHeart className="mr-2" />
                    My Interests
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Settings / Extra */}
          <div className="p-2 border-t w-full">
            <button className="btn btn-ghost w-full justify-start">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
