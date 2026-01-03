import React from "react";

const CropInformation = ({ crop }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 shadow-lg rounded-lg overflow-hidden bg-base-100 p-2 md:p-6">
      <div className="md:w-2/3">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-xl"
        />
      </div>
      <div className="md:w-1/3 flex flex-col justify-center ml-0 md:ml-5 space-y-4">
        <h1 className="text-3xl font-bold text-primary">{crop.name}</h1>
        <p className="text-base-content text-lg">{crop.description}</p>

        <div className="flex flex-col gap-2 font-semibold text-base-content">
          <p>
            Price: <span className="text-success">{crop.pricePerUnit} ৳ / {crop.unit}</span>
          </p>
          <p>
            Available Quantity: <span className="text-success">{crop.quantity} {crop.unit}</span>
          </p>
          <p>
            Location: <span className="text-secondary">{crop.location}</span>
          </p>
          <p >
              Added on: {new Date(crop.createdAt).toLocaleDateString()}
            </p>
        </div>
      </div>
    </div>
  );
};

export default CropInformation;
