import React, { use } from 'react';

import userImg from '../../assets/icons8-avatar-48.png'
import { Link,  } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';

const Profile = () => {
 

  const { user  } = use(AuthContext)
   
   
  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-80 text-center">
        {user ? (
          <>
            <img
              src={user.photoURL || userImg}
              alt={user.displayName}
              className="w-32 h-32 mx-auto rounded-full border-4 border-green-400 mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.displayName}</h2>
            <p className="text-gray-500 mb-6">{user.email}</p>
             
            <Link to='/updateForm'  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
              Update Profile
            </Link>
          </>
        ) : (
          <> 
            <p className="text-xl text-gray-700">Please login to view your profile...</p>
            {/*login  button */}
          <Link to='/auth/login' type="submit" className="btn btn-neutral bg-green-600 hover:bg-green-700 text-white mt-4">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;