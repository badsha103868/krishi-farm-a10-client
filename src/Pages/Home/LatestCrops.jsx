import React, { use } from 'react';
import LatestCrop from './LatestCrop';

const LatestCrops = ({ latestCropsPromise }) => {
   const crops = use(latestCropsPromise)
   console.log(crops)
  return (
    <div className='mt-5'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-2'>Latest <span className='text-secondary'>Crops</span></h2> 
      <p className="text-neutral text-xl font-semibold text-center mb-2">
          Freshly harvested crops directly from our trusted farmers.
        </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
         {
          crops.map(crop=><LatestCrop key={crop._id} crop={crop}></LatestCrop>)
         }

      </div>
    </div>
  );
};

export default LatestCrops;