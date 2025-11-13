import React from "react";

const CropInformation = ({ crop }) => {
  const { image, name, description, pricePerUnit, unit, quantity, location } = crop;

  return (
    <div className="flex flex-col md:flex-row gap-6 shadow-lg rounded-lg overflow-hidden bg-white">
      {/* Crop Image */}
      <div className="md:w-1/2">
        <img
          src={image}
          alt={name}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Crop Info */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">{name}</h1>
        <p className="text-neutral text-lg">{description}</p>

        <div className="flex flex-col gap-2 text-gray-800 font-semibold">
          <p className="font-semibold">Price: <span className="font-semibold text-green-600">{pricePerUnit} ৳ / {unit}</span>
          </p>
          <p
             className="font-semibold">Available Quantity: <span className="text-green-800">{quantity} {unit}</span>
          </p>
          <p className="font-semibold">Location: <span className="text-secondary">{location}</span>
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default CropInformation;
