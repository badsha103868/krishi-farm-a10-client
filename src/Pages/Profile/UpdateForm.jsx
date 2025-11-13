import React, { use, useState } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';

const MySwal = withReactContent(Swal)

const UpdateForm = () => {

  // error state
        const [error, setError]= useState('')

   const { user , updateUser , setUser } = use(AuthContext)
  
   const navigate = useNavigate()
    

   const handleUpdateProfile=(e)=>{
      e.preventDefault();
      const form = e.target
      const name = form.name.value;
      const photoUrl = form.photoUrl.value;
      console.log("update form submitted", name, photoUrl) 

      if(name.length < 6){
        setError("Name should be 6 character or more")
        return;
      }
       setError("")




      updateUser({
             displayName: name,
             photoURL: photoUrl
         })
         .then(() =>{
            setUser({...user,displayName: name,
             photoURL: photoUrl})

              toast.success("Update profile successfully!");

               MySwal.fire({
            title: "Update profile successfully!",
           text: "Updated Profile!",
           icon: "success"
           })
              
             form.reset(); 

             setTimeout(()=>{

            navigate('/myProfile')
           }, 1000)

            })

            .catch(error=>{
            console.log(error.message)
             setUser(user)
             setError(error.message)
            })

     }

  return (
   <div className='flex justify-center items-center my-10'>
       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-2xl font-bold text-center">Update your profile</h1>
        <form onSubmit={handleUpdateProfile} className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input 
          type="text" 
          className="input" 
          name='name'
           defaultValue={user?.displayName}
          placeholder="Your Name" required />
           {/* Photo Url */}
          <label className="label">Photo URL</label>
          <input 
          type="text" 
          className="input" 
          name='photoUrl'
          defaultValue={user?.photoURL}
          placeholder="Your Photo URL" required />
          
          <button  className="btn btn-primary text-white mt-4">Update Profile</button>
          {
          error && <p className='text-secondary text-xs'>{error}</p>
          }
        </form>

          
      </div>
    </div>
    </div>
  );
};

export default UpdateForm;