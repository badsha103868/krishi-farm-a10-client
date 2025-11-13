import React, { useState } from "react";
import { useLoaderData } from "react-router";
import CropInformation from "./CropInformation";
import InterestSection from "./InterestSection";

const CropDetails = () => {
  const loadedCrop = useLoaderData();
  const [crop, setCrop] = useState(loadedCrop); // ✅ crop state manage here

  return (
    <div className="my-4">
      <CropInformation crop={crop} />
      <InterestSection crop={crop} setCrop={setCrop} />
    </div>
  );
};

export default CropDetails;
