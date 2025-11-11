import React, { Suspense } from 'react';
import { useLoaderData } from 'react-router';
import AllCrop from './AllCrop';

const AllCrops = () => {
  const data = useLoaderData()
  console.log(data)
  return (


    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 p-2 md:p-6'>

     <Suspense fallback={<span>Loading....</span>}>
       {
        data.map(crop=> <AllCrop key={crop._id} crop={crop}></AllCrop>)
      }
     </Suspense>
      
    </div>
  );
};

export default AllCrops;