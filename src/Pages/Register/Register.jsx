import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';

const Register = () => {
  const {createUser}= use(AuthContext);
 

  const handleRegister=(e)=>{
    e.preventDefault();
     const form = e.target
      const name = form.name.value;
      const photoUrl = form.photoUrl.value;
      const email= form.email.value;
      const password = form.password.value;

      console.log(name, photoUrl, email, password)
       createUser(email, password)
      .then(result=>{
      const user = result.user;
      console.log(user)
       })
      .catch(error=>{
       console.log(error.message)
       })


  }

  return (
   <div className='flex justify-center items-center  min-h-screen'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">

        {/* form */}
      <form onSubmit={handleRegister} className="card-body">
        <h1 className="text-2xl font-bold text-center">Register your account</h1>
        
        <fieldset className="fieldset">
          
          {/* Name */}
          <label className="label">Name</label>
          <input 
          type="text" 
          className="input" 
          name='name'
          placeholder="Your Name" required />
           {/* Photo Url */}
          <label className="label">Photo URL</label>
          <input 
          type="text" 
          className="input" 
          name='photoUrl'
          placeholder="Your Photo URL"  />
          {/* email */}
          <label className="label">Email</label>
           
             <input
           type="email" 
           className="input"
             name='email'
            placeholder="Email" required />
            
            

           
            {/* password */}
          <label className="label">Password</label>
          {/* <div className='relative'> */}
             <input 
          // type={showPassword? 'text': "password"}
          type='password' 
          className="input"
          name='password'
           placeholder="Password" required />

            {/* <button onClick={handleShowPassword} className="btn btn-xs top-2 right-5 absolute">{showPassword? <FaRegEyeSlash /> : <FaEye />}</button>

          </div> */}
           
          {/*login  button */}
          <button type="submit" className="btn btn-primary bg-green-600 hover:bg-green-700 text-white mt-4">Register</button>

        {/* error and success showing  */}
           
        {/* {
        success && <p className="text-green-500">Account Created Successfully</p>
        } */}
        {/* {
          error && <p className='text-secondary text-xs'>{error}</p>
        } */}
        </fieldset>
         <p className='font-semibold text-center mt-5'>All Ready Have An Account ? <Link className='text-secondary' to='/auth/login/'>Login</Link></p>
          <button className='btn btn-secondary btn-outline w-full mt-4'><FcGoogle size={24} /> Sign up with Google</button>
      </form>

    </div>
    </div>
  );
};

export default Register;