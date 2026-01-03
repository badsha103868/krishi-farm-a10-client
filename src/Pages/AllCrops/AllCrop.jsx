import React from "react";
import { Link } from "react-router";

const AllCrop = ({ crop }) => {
  const {
    image,
    name,
    pricePerUnit,
    type,
    _id,
    unit,
    location,
    createdAt
  } = crop;

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
            {/* Title */}
            <h2 className="card-title text-xl font-bold text-primary">{name}</h2>
    
            {/* Type */}
            <p className="text-sm text-base-content/70">
              Type: <span className="font-semibold text-secondary">{type}</span>
            </p>
    
            {/* Price */}
            <p className="text-sm text-base-content/80">
              Price: <span className="font-semibold text-success">{pricePerUnit} Tk</span> / {unit}
            </p>
    
            {/* Location & Date */}
            <p className="text-sm text-base-content/70">
              Location: <span className="font-medium">{location}</span>
            </p>
            <p className="text-xs text-base-content/50">
              Added on: {new Date(createdAt).toLocaleDateString()}
            </p>
    
            {/* View Details Button */}
            <div className="card-actions mt-3">
              <Link
                to={`/cropDetails/${_id}`}
                className="btn btn-primary w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
  );
};

export default AllCrop;
