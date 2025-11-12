import React, { use } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { Link } from 'react-router';

const Login = () => { 
  
  const {createUser}= use(AuthContext);

  const handleLogin = (e)=>{
    e.preventDefault()
    const form= e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    
  }
   

  return (
    <div className='flex justify-center items-center  min-h-screen'>
       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-2xl font-bold text-center">Login your account </h1>

         <fieldset  className="fieldset">

          {/* email */}
          <label className="label">Email</label>
          <input
           type="email" 
           className="input"
             name='email'
             
            placeholder="Email"  />

            {/* password */}
            
           <label className="label">Password</label>
           {/* <div className='relative'> */}
             <input 
            type="password"
             className="input"
              name='password'
           placeholder="Password" required 
            />

             {/* <button onClick={handleShowPassword} className='btn btn-xs top-2 right-5 absolute'>{showPassword? <FaRegEyeSlash /> : <FaEye />}</button>
            </div> */}

           {/* forget password */}
          <div className='mt-2'><Link to='/auth/forgetPassword/'  className="link link-hover text-green-600 hover:text-green-800 underline text-sm">Forgot password?</Link></div>

          {/*login  button */}
          <button type="submit" className="btn btn-neutral bg-green-600 hover:bg-green-700 text-white mt-4">Login</button>
        
        {/* error showing  */}
        {/* {
          error && <p className='text-secondary text-xs'>{error}</p>
        } */}

        </fieldset>
        </form>
       </div>
    </div>
  );
};

export default Login;