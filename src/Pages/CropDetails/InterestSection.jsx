import React, { use, useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const MySwal = withReactContent(Swal);

const InterestSection = ({ crop }) => {
  const { user } = use(AuthContext);
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [totalPrice , setTotalPrice] = useState(0);
  const [hasSentInterest, setHasSentInterest]= useState(false)

    // modal ref
  const interestModalRef = useRef(null);
   


  const isOwner = user?.email === crop?.owner?.ownerEmail;


  // auto calculation total  price
  useEffect(()=>{
    if(quantity && crop?.pricePerUnit){
      setTotalPrice(quantity * crop.pricePerUnit)
    }
    else {
      setTotalPrice(0);
    }
  },[quantity, crop?.pricePerUnit])

  // hasSentInterest check
  useEffect(()=>{
    if(crop?.interests?.length>0 && user?.email){
      const alreadySent = crop.interests.find(interest=> interest.userEmail === user.email)
      setHasSentInterest(alreadySent)
    }
  },[crop?.interests, user?.email])

   
  // modal open
  const handleInterestModalOpen =()=>{
    interestModalRef.current.showModal();
  }


   
  // Handle interest submit
  const handleConfirmSubmit = (e) => {
    e.preventDefault();

     

    const newInterest = {
      userEmail: user.email,
      userName: user.displayName,
      quantity,
      message,
    };

    fetch(`http://localhost:3000/crops/${crop._id}/interests`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newInterest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          MySwal.fire({
            icon: "success",
            title: "Interest Sent!",
            text: "Your interest has been successfully submitted.",
          });
          setQuantity("");
          setMessage("");
           setTotalPrice(0);
          setHasSentInterest(true);
          interestModalRef.current.close();
        } else {
          MySwal.fire({
            icon: "error",
            title: "Oops!",
            text: data.message || "Failed to send interest.",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        MySwal.fire({
          icon: "error",
          title: "Server Error",
          text: "Something went wrong. Try again later.",
        });
      });
  };
   
        





  // Owner view 


  if (isOwner) {
    return (
      <div className="mt-8 p-4 border rounded-xl bg-green-50 shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-green-700">
          Received Interest Requests
        </h2>

        {crop.interests?.length > 0 ? (
          crop.interests.map((interest) => (
            <div
              key={interest._id}
              className="border p-3 mb-3 rounded-lg bg-white shadow-sm"
            >
              <p className="font-semibold text-gray-800">
                Buyer: {interest.userName}
              </p>
              <p>Email: {interest.userEmail}</p>
              <p>Quantity: {interest.quantity}</p>
              <p>Message: {interest.message}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    interest.status === "pending"
                      ? "text-yellow-500"
                      : interest.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {interest.status}
                </span>
              </p>
              <div className="flex gap-3 mt-2">
                <button className="btn btn-success btn-sm">Accept</button>
                <button className="btn btn-error btn-sm">Reject</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No interests yet.</p>
        )}
      </div>
    );
  }
    
  // Buyer view (not owner)
  return (
    <div className="mt-8  p-6 rounded-xl bg-white shadow-md">
      <h2 className="text-xl text-center font-bold mb-4 text-green-600">
        Send Your Interest
      </h2>
    {
      hasSentInterest ? (<div className="text-center text-gray-600 font-medium bg-green-50 p-5 rounded-lg">
         You’ve already sent an interest for this crop.
        </div>):(  
           <form  className="space-y-3">
        <div>
          <label className="block mb-1 font-semibold">Quantity (kg)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Enter desired quantity"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Total Price (৳)</label>
          <input
            type="number"
            value={totalPrice}
            readOnly
            className="input input-bordered w-full"
            
          />
           <p className="text-sm text-gray-500 mt-1">
            Unit Price: ৳{crop.pricePerUnit} per {crop.unit}
          </p>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="textarea textarea-bordered w-full"
            placeholder="Write your message..."
          ></textarea>
        </div>
        <button  onClick={handleInterestModalOpen}
          type="button"
          className="btn bg-primary hover:bg-green-500 text-white w-full"
        >
          Submit Interest
        </button>
      </form>
        
      )
    }
   
      {/*  Confirmation Modal */}
      <dialog ref={interestModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Confirm Your Interest</h3>
          <p className="text-gray-600">
            Are you sure you want to send interest for{" "}
            <strong>{quantity} kg {crop.name}</strong>?
          </p>
          <p className="mt-2">
            Total Price: <strong>৳{totalPrice}</strong>
          </p>
          <div className="modal-action">
            <button onClick={handleConfirmSubmit} className="btn btn-success">
              Confirm
            </button>
            <button
              onClick={() => interestModalRef.current.close()}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

     
    </div>
  );
};

export default InterestSection;
