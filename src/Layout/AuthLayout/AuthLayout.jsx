import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Pages/Loading/Loading';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
  
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location)


  return (
    <div className='w-11/12 mx-auto '>
      <Navbar></Navbar>
      {/* loading spinner */}
       {
         isNavigating&& (<Loading></Loading>)
       }
      <Outlet></Outlet>
      <Footer></Footer>

      
         {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AuthLayout;