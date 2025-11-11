import React from 'react';
import { Link, NavLink } from 'react-router';
import logoImg from '../../assets/logoFarm2.jpeg'

const Navbar = () => {
   
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allCrops">All Crops</NavLink>
      </li>
      
      
        <>
          <li>
            <NavLink to="/myProfile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/addCrops">Add Crops</NavLink>
          </li>
          <li>
            <NavLink to="/myPosts">My Posts</NavLink>
          </li>
          <li>
            <NavLink to="/myInterests">My Interests</NavLink>
          </li>
        </>
     
    </>
  );


  return (
     <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
           {/* navbar left */}
       <div className="flex items-center gap-1 ">

            <img className="w-[30px] h-[30px]  md:w-[35px] md:h-[35px] rounded-full " src={logoImg} alt="" />
         
            <h3 className="font-medium md:font-semibold  lg:font-bold text-primary text-xl">Krishi Farm</h3>
         </div>
      </div>
       {/* navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
         
          <Link  className="btn btn-primary">
            Sign Out
          </Link>
        
          <Link to="/register" className="btn">
            Login
          </Link>
      
      </div>
    </div>
  );
};

export default Navbar;