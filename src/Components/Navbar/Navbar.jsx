import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; // ✅ FIXED
import logoImg from "../../assets/logoFarm2.jpeg";
import userImg from "../../assets/icons8-avatar-48.png";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Moon, Sun } from "lucide-react";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You Logged Out successfully");
        MySwal.fire({
          title: "Logged Out!",
          text: "You Logged Out successfully!",
          icon: "success",
        });
      })
      .catch((error) => console.log(error.message));
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={handleLinkClick}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allCrops" onClick={handleLinkClick}>
          All Crops
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/myProfile" onClick={handleLinkClick}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/addCrops" onClick={handleLinkClick}>
              Add Crops
            </NavLink>
          </li>
          <li>
            <NavLink to="/myPosts" onClick={handleLinkClick}>
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink to="/myInterests" onClick={handleLinkClick}>
              My Interests
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        {/* dropdown for small device */}
        <div className="dropdown relative">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <ul
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow absolute ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img
            className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full"
            src={logoImg}
            alt=""
          />
          <h3 className="font-medium md:font-semibold lg:font-bold text-primary text-xl">
            Krishi <span className="text-secondary">Farm</span>
          </h3>
        </Link>
      </div>

      {/* navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* navbar end */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img
                className="w-10 rounded-full"
                src={user.photoURL || userImg}
              />
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/myProfile">Profile</NavLink>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link to="/auth/login/" onClick={handleLinkClick}>
              <button className="btn btn-primary px-2 md:px-5">
                Login
              </button>
            </Link>
            <Link to="/auth/register" onClick={handleLinkClick}>
              <button className="btn btn-secondary text-white px-2 md:px-5">
                Register
              </button>
            </Link>
          </div>
        )}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="btn btn-ghost btn-circle ml-2"
          title="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
