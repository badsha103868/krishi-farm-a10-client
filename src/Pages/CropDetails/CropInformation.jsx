import React from "react";

const CropInformation = ({ crop }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 shadow-lg rounded-lg overflow-hidden bg-white p-2 md:p-6">
      <div className="md:w-2/3">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-xl"
        />
      </div>
      <div className="md:w-1/3 flex flex-col justify-center ml-5 space-y-4">
        <h1 className="text-3xl font-bold text-primary">{crop.name}</h1>
        <p className="text-neutral text-lg">{crop.description}</p>

        <div className="flex flex-col gap-2 text-gray-800 font-semibold">
          <p>
            Price: <span className="text-green-600">{crop.pricePerUnit} ৳ / {crop.unit}</span>
          </p>
          <p>
            Available Quantity: <span className="text-green-800">{crop.quantity} {crop.unit}</span>
          </p>
          <p>
            Location: <span className="text-secondary">{crop.location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CropInformation;
