import React, { use, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";
import Loading from "../Loading/Loading";

const MySwal = withReactContent(Swal);

const AddCrop = () => {
  const { user, loading: authLoading } = use(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddCrop = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const pricePerUnit = form.price.value;
    const unit = form.unit.value;
    const quantity = form.quantity.value;
    const description = form.description.value;
    const location = form.location.value;
    const image = form.image.value;

    console.log(
      name,
      type,
      pricePerUnit,
      unit,
      quantity,
      description,
      location,
      image
    );

    const newCrop = {
      name,
      type,
      pricePerUnit,
      unit,
      quantity,
      description,
      location,
      image,
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName,
      },
      createdAt: new Date(),
    };
    setLoading(true);
    fetch("https://krishi-farm-a10-server.vercel.app/crops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCrop),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Crop Added!",
            text: "Your crop has been added successfully.",
          });

          navigate("/myPosts");
        }
      });
  };

  if (authLoading || loading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center items-center  min-h-screen my-5">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
        {/* form */}
        <form onSubmit={handleAddCrop} className="card-body">
          <h1 className="text-2xl text-primary font-bold text-center">
            Add Crop
          </h1>

          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Crop Name</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Crop Name"
              required
            />

            {/* Type*/}
            <label className="label">Type</label>
            <input
              type="text"
              className="input"
              name="type"
              placeholder="Crop type"
              required
            />

            {/* Price*/}
            <label className="label">Price</label>
            <input
              type="number"
              className="input"
              name="price"
              placeholder="Price per unit"
              required
            />

            {/* Unit*/}
            <label className="label">Unit</label>
            <input
              type="text"
              className="input"
              name="unit"
              placeholder="unit (kg, ton, bag)"
              required
            />

            {/* Quantity*/}
            <label className="label"> Quantity</label>
            <input
              type="number"
              className="input"
              name="quantity"
              placeholder="Estimated quantity (the quantity you expect to harvest)"
              required
            />

            {/*Description*/}
            <label className="label">Description</label>
            <input
              type="text"
              className="input"
              name="description"
              placeholder="Description (short details about your crop)"
              required
            />

            {/*Location*/}
            <label className="label">Location</label>
            <input
              type="text"
              className="input"
              name="location"
              placeholder="Location(where the crop is grown)"
              required
            />

            {/*image*/}
            <label className="label">Image</label>
            <input
              type="text"
              className="input"
              name="image"
              placeholder="Image(photo of your crop)"
              required
            />

            {/*login  button */}
            <button
              type="submit"
              className="btn btn-primary bg-green-600 hover:bg-green-700 text-white mt-4"
            >
              Add Crop
            </button>

            {/* error and success showing  */}

            {/* {
        success && <p className="text-green-500">Account Created Successfully</p>
        }
        {
          error && <p className='text-secondary text-xs'>{error}</p>
        } */}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
