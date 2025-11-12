import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import logoImg from '../../assets/logoFarm2.jpeg'
import userImg from '../../assets/icons8-avatar-48.png'
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Navbar = () => {
   const {user, logOut}= use(AuthContext) 


   const handleLogOut = ()=>{
    logOut()
    .then(()=>{
      toast.success("You Logged Out successfully")
       MySwal.fire({
            title: "Logged Out!",
           text: "You Logged Out successfully!",
           icon: "success"
           })
    })
    .catch(error =>{
      console.log(error.message)
    })
   }





  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allCrops">All Crops</NavLink>
      </li>
       {
        user&&(
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
        )
       }
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
         
            <h3 className="font-medium md:font-semibold  lg:font-bold text-primary text-xl">Krishi <span className='text-secondary'>Farm</span></h3>
         </div>
      </div>
       {/* navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end ">

         {
          user?(<div className='flex items-center gap-1'>
          <img  className="w-12 h-12 rounded-full bg-white" src={user.photoURL || userImg} alt="avatar" /> 
            <button onClick={handleLogOut} className="btn btn-primary bg-[#2E7D32] px-2 md:px-5">Logout</button>
            
        
          </div>):( <div className=" flex space-x-2">
            <Link to='/auth/login/'> 
            <button className="btn btn-primary bg-[#2E7D32] px-2 md:px-5">Login</button>
            </Link>
            <Link to='/auth/register'>
            <button className="btn btn-secondary text-white  px-2 md:px-5">Register</button>
            </Link>
          </div>)
         }
         
          
      
      </div> 
    </div>
  );
};

export default Navbar;