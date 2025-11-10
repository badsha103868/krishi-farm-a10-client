import React from 'react';
import { Link } from 'react-router';

const LatestCrop = ({ crop }) => {
  
   const {image, name,pricePerUnit,type, _id, unit } = crop

  return (
     <div className="card bg-base-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <figure className="px-4 pt-4">
        <img
          src={image}
          alt={name}
          className="rounded-xl h-[250px] w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-gray-800">
          {name}
        </h2>
        <p className="text-sm font-medium text-gray-600">
          Type: <span className="font-semibold text-lg text-primary">{type}</span>
        </p>
        <p className="text-sm font-medium text-gray-700">
          Price: <span className="font-semibold text-green-600">{pricePerUnit} Tk</span> / {unit}
        </p>
        <div className="card-actions mt-3">
          <Link to='/allCrops' className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestCrop;