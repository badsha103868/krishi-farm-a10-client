import React, { useState } from "react";
import { useLoaderData } from "react-router";
import CropInformation from "./CropInformation";
import InterestSection from "./InterestSection";

const CropDetails = () => {
  const loadedCrop = useLoaderData();
  //crop state manage
  const [crop, setCrop] = useState(loadedCrop); 

  return (
    <div className="my-4">
      <CropInformation crop={crop} />
      <InterestSection crop={crop} setCrop={setCrop} />
    </div>
  );
};

export default CropDetails;
