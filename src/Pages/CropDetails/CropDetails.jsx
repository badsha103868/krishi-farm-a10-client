import React from 'react';
import { useLoaderData } from 'react-router';
import CropInformation from './CropInformation';

const CropDetails = () => {
  const crop = useLoaderData();
  console.log(crop)

  return (
    <div className='my-2'>
        <CropInformation crop={crop}></CropInformation>
    </div>
  );
};

export  default CropDetails;