import React, { use, useState } from 'react';

import userImg from '../../assets/icons8-avatar-48.png'
import { Link,  } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Loading from '../Loading/Loading';

const Profile = () => {
 

  const { user , loading:authLoading
   } = use(AuthContext)
   const [loading, setLoading] = useState(false);

   if(loading || authLoading){
    return <Loading></Loading>
   }
   
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="bg-base-100 shadow-lg rounded-2xl p-8 w-80 text-center">
        <img
          src={user.photoURL || userImg}
          alt={user.displayName}
          className="w-32 h-32 mx-auto rounded-full border-4 border-primary mb-4"
        />
        <h2 className="text-2xl font-semibold text-base-content mb-2">
          {user.displayName}
        </h2>
        <p className="text-base-content/70 mb-6">{user.email}</p>

        <Link
          to="/updateForm"
          className="btn btn-primary w-full"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;