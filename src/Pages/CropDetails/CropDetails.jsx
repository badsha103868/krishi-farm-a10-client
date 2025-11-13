import React from 'react';
import { useLoaderData } from 'react-router';
import CropInformation from './CropInformation';
import InterestSection from './InterestSection';

const CropDetails = () => {
  const crop = useLoaderData();
  console.log(crop)

  return (
    <div className='my-2'>
        <CropInformation crop={crop}></CropInformation>
        <InterestSection crop={crop}></InterestSection>
    </div>
  );
};

export  default CropDetails;