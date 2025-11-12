import React from 'react';
import { MdErrorOutline } from "react-icons/md";
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className='flex flex-col col-span-full   justify-center  items-center h-[50vh]'>
      <MdErrorOutline className='text-6xl text-red-500 mb-4' />
       <p className='text-5xl font-bold'>404</p>
       <h3 className="text-center col-span-full text-red-500 text-2xl">Not Found</h3>
        <span className='text-gray-400'>Sorry,the page you are looking for might be removed , renamed or is temporarily unavailable </span>
        <div>
          <Link to='/'>
          <button className='btn bg-[linear-gradient(125.07deg,rgba(99,46,227,1),rgba(159,98,242,1)_100%)] text-white py-3 px-5 font-semibold mt-6'>Back To Home</button>
          </Link>
        
        </div>

    </div>
  );
};

export default ErrorPage;