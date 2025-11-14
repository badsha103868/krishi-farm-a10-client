import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaEye, FaRegEyeSlash } from "react-icons/fa6";
import { GoogleAuthProvider } from "firebase/auth";

const MySwal = withReactContent(Swal);

const Register = () => {
  // error state
  const [error, setError] = useState("");
  //  success state
  const [success, setSuccess] = useState(false);

  // show password state
  const [showPassword, setShowPassword] = useState(false);

  // navigate
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const { createUser, googleSignIn, updateUser, user, setUser } =
    use(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, photoURL, email, password);

    //  email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSuccess(false);

    // password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters or long and include uppercase and  lowercase"
      );
      return;
    }
    setError("");
    setSuccess(false);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        //   update profile
        updateUser({
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });

            const newUser = {
              name: user.displayName,
              email: user.email,
              image: user.photoURL,
            };

            //  create user in database
            fetch("https://krishi-farm-a10-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("data after user save", data);
              });

            setSuccess(true);
            toast.success("Registration successfully!");

            MySwal.fire({
              title: "Register!",
              text: "Registration successfully!",
              icon: "success",
            });

            form.reset();

            setTimeout(() => {
              navigate("/");
            }, 1000);
          })
          .catch((error) => {
            console.log(error.message);
            setUser(user);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        toast("please provide a valid info");
      });
  };

  //   google sign in
  const handleGoogleSignIn = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        //  create user in database
        fetch("https://krishi-farm-a10-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after user save", data);
          });

        toast.success("Log in successfully!");

        MySwal.fire({
          title: "Register!",
          text: "Registration successfully!",
          icon: "success",
        });
        setTimeout(() => {
          navigate(location.state ? location.state : "/");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  handleShowPassword
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center  min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
        {/* form */}
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-2xl font-bold text-center">
            Register your account
          </h1>

          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Your Name"
              required
            />
            {/* Photo Url */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              name="photoURL"
              placeholder="Your Photo URL"
            />
            {/* email */}
            <label className="label">Email</label>

            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
              required
            />

            {/* password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                name="password"
                placeholder="Password"
                required
              />

              <button
                onClick={handleShowPassword}
                className="btn btn-xs top-2 right-5 absolute"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/*login  button */}
            <button
              type="submit"
              className="btn btn-primary bg-green-600 hover:bg-green-700 text-white mt-4"
            >
              Register
            </button>

            {/* error and success showing  */}

            {success && (
              <p className="text-green-500">Account Created Successfully</p>
            )}
            {error && <p className="text-secondary text-xs">{error}</p>}
          </fieldset>
          <p className="font-semibold text-center mt-5">
            All Ready Have An Account ?{" "}
            <Link className="text-secondary" to="/auth/login/">
              Login
            </Link>
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-secondary btn-outline w-full mt-4"
          >
            <FcGoogle size={24} /> Register with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
