import React, { use, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';

const MySwal = withReactContent(Swal)

const Login = () => { 
  // error state
  const [error ,setError] = useState('')

  //  show password state
  const [showPassword, setShowPassword] = useState(false) 


  // use location 
  const location = useLocation()

  // use navigate
  const navigate   = useNavigate()

   console.log(location)
  const { signIn, googleSignIn }= use(AuthContext);

    const  googleProvider = new GoogleAuthProvider()

  const handleLogin = (e)=>{
     setError('')
    e.preventDefault()
    
    const form= e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    
    signIn(email, password)
    .then(result =>{
      const user = result.user;
      console.log(user)

      
     toast.success("Log in successfully!");
     
     
          MySwal.fire({
            title: "Login!",
           text: "Login successfully!",
           icon: "success"
           })


      setTimeout(() => {
      navigate(location.state ? location.state : '/');
       }, 1000); 
       form.reset()
    })
    .catch(error =>{
      console.log(error.message)
      setError(error.message)
      toast("Please provide a valid email or password")

      form.reset()

    })
  }


  //   google sign in
  const handleGoogleSignIn = ()=> {
       googleSignIn(googleProvider)
       .then(result =>{
        const user = result.user;
        console.log(user)
         
         const newUser = {
        name: user.displayName,
        email:user.email,
        image: user.photoURL
       }

           //  create user in database
      fetch('http://localhost:3000/users',{
         method:"POST",
         headers:{
           'content-type':'application/json'
         },
         body: JSON.stringify(newUser)
       })
      .then(res =>res.json())
      .then(data =>{
        console.log('data after user save',data)
      })


        toast.success("Log in successfully!");

        MySwal.fire({
            title: "Login!",
           text: "Login successfully!",
           icon: "success"
           })
        setTimeout(()=>{
          navigate(location.state? location.state : '/');
        },1000)
       })
       .catch(error=>{
        console.log(error)
       })
  }

    // show password
    const handleShowPassword =(e)=>{
      e.preventDefault();
      setShowPassword(!showPassword)
     
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
             
            placeholder="Email" required
              onChange={() => setError('')}
               />
            

             {/* password */}
            
           <label className="label">Password</label>
           <div className='relative'>
             <input 
            type={showPassword?"text": "password"}
             className="input"
              name='password'
           placeholder="Password" required 
           onChange={() => setError('')}  />

             <button onClick={handleShowPassword} className='btn btn-xs top-2 right-5 absolute'>{showPassword? <FaRegEyeSlash /> : <FaEye />}</button>
            </div>

           {/* forget password */}
          <div className='mt-2'><Link to='/auth/forgetPassword/'  className="link link-hover text-green-600 hover:text-green-800 underline text-sm">Forgot password?</Link></div>

          {/*login  button */}
          <button type="submit" className="btn btn-neutral bg-primary hover:bg-green-500 text-white mt-4">Login</button>
        
        {/* error showing  */}
        {
          error && <p className='text-secondary text-xs'>{error}</p>
        }

        </fieldset>
         
           {/* Have not  An Account */}

        <p className='font-semibold text-center mt-5'>Dont’t Have An Account ? <Link className='text-secondary' to='/auth/register/'>Register</Link></p>

           {/* social login with google */}

         <button onClick={handleGoogleSignIn} className='btn btn-secondary btn-outline w-full mt-4'><FcGoogle size={24} /> Login with Google</button>

        </form>
       </div>
    </div>
  );
};

export default Login;