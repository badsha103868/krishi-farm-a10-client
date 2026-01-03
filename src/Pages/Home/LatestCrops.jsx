import React, { use } from 'react';
import LatestCrop from './LatestCrop';
import { Link } from 'react-router';
import Loading from '../Loading/Loading';

const LatestCrops = ({ latestCropsPromise }) => {
   const crops = use(latestCropsPromise)
   console.log(crops)
    if (!crops || crops.length === 0) return <Loading />
  return (
    <div className='mt-5 max-w-7xl mx-auto px-4'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-2 dark:text-lime-300'>
        Latest <span className='text-secondary'>Crops</span>
      </h2> 
      <p className="text-base-content text-xl font-semibold text-center mb-6 dark:text-gray-300">
          Freshly harvested crops directly from our trusted farmers.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
         {crops.map(crop => (
           <LatestCrop key={crop._id} crop={crop}></LatestCrop>
         ))}
      </div>
       
      <div className='flex justify-center mt-6'>
        <Link to='/allCrops' className='btn btn-primary text-xl text-white px-10'>
          View All
        </Link>
      </div>
    </div>
  );
};

export default LatestCrops;