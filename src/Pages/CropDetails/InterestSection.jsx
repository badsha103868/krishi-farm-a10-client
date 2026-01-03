import React, { useEffect, useRef, useState, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const MySwal = withReactContent(Swal);

const InterestSection = ({ crop: initialCrop, setCrop }) => {
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasSentInterest, setHasSentInterest] = useState(false);
  const interestModalRef = useRef(null);

  const isOwner = user?.email === initialCrop?.owner?.ownerEmail;

  // auto price calculation
  useEffect(() => {
    if (quantity && initialCrop?.pricePerUnit) {
      setTotalPrice(quantity * initialCrop.pricePerUnit);
    } else {
      setTotalPrice(0);
    }
  }, [quantity, initialCrop?.pricePerUnit]);

  // check if user already sent interest
  useEffect(() => {
    if (initialCrop?.interests?.length > 0 && user?.email) {
      const alreadySent = initialCrop.interests.find(
        (interest) => interest.userEmail === user.email
      );
      setHasSentInterest(alreadySent);
    }
  }, [initialCrop?.interests, user?.email]);

  // open modal
  const handleInterestModalOpen = () => {
    if (!quantity || quantity <= 0) {
      MySwal.fire({
        icon: "warning",
        title: "Invalid Quantity",
        text: "Please enter a valid quantity greater than 0.",
      });
      return;
    }

    if (!message.trim()) {
      MySwal.fire({
        icon: "warning",
        title: "Message Required",
        text: "Please write a short message before submitting.",
      });
      return;
    }

    interestModalRef.current.showModal();
  };

  // confirm submit
  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    const newInterest = {
      userEmail: user.email,
      userName: user.displayName,
      quantity,
      message,
    };

    fetch(`http://localhost:3000/crops/${initialCrop._id}/interests`, {
      method: "POST",
      headers: { "content-type": "application/json" },
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

          // instantly update crop in parent
          const updatedCrop = {
            ...initialCrop,
            interests: [...(initialCrop.interests || []), data.interest],
          };
          setCrop(updatedCrop);

          interestModalRef.current.close();
        } else {
          MySwal.fire({
            icon: "error",
            title: "Oops!",
            text: data.message || "Failed to send interest.",
          });
        }
      })
      .catch(() => {
        MySwal.fire({
          icon: "error",
          title: "Server Error",
          text: "Something went wrong. Try again later.",
        });
      });
  };

  // Accept / Reject function
  const handleStatusUpdate = (interestId, newStatus, quantityRequested) => {
    fetch(`http://localhost:3000/interests/${interestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cropsId: initialCrop._id,
        status: newStatus,
        quantity: quantityRequested,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          MySwal.fire({
            icon: "success",
            title: `Interest ${newStatus}!`,
            text: `You have ${newStatus} this interest.`,
          });

          // update interests & quantity
          const updatedInterests = initialCrop.interests.map((i) =>
            i._id === interestId ? { ...i, status: newStatus } : i
          );
          const updatedQuantity =
            newStatus === "accepted"
              ? initialCrop.quantity - quantityRequested
              : initialCrop.quantity;

          setCrop({
            ...initialCrop,
            interests: updatedInterests,
            quantity: updatedQuantity,
          });
        }
      });
  };

  // OWNER VIEW
  if (isOwner) {
    return (
      <div className="mt-8 p-4 border rounded-xl bg-base-100 shadow-md">
        <h2 className="text-xl text-center font-bold mb-3 text-primary">
          Received Interest Requests
        </h2>
        {initialCrop.interests?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Buyer Name</th>
                  <th>Quantity</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialCrop.interests.map((interest, idx) => (
                  <tr key={interest._id}>
                    <th>{idx + 1}</th>
                    <td className="text-base-content">{interest.userName}</td>
                    <td className="text-base-content">{interest.quantity}</td>
                    <td className="text-base-content">{interest.message}</td>
                    <td className="capitalize font-semibold text-primary">
                      {interest.status}
                    </td>
                    <td>
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              interest._id,
                              "accepted",
                              interest.quantity
                            )
                          }
                          disabled={interest.status !== "pending"}
                          className="btn btn-success btn-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              interest._id,
                              "rejected",
                              interest.quantity
                            )
                          }
                          disabled={interest.status !== "pending"}
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-base-content text-xl text-center">
            No interests yet.
          </p>
        )}
      </div>
    );
  }

  // BUYER VIEW
  return (
    <div className="mt-8 p-6 rounded-xl bg-base-100 shadow-md">
      <h2 className="text-xl text-center font-bold mb-4 text-primary">
        Send Your Interest
      </h2>
      {hasSentInterest ? (
        <div className="text-center text-base-content font-medium bg-base-200 p-5 rounded-lg">
          You’ve already sent an interest for this crop.
        </div>
      ) : (
        <form className="space-y-3">
          <div>
            <label className="block mb-1 font-semibold text-base-content">
              Quantity ({initialCrop.unit})
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              required
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Enter desired quantity"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base-content">
              Total Price (৳)
            </label>
            <input
              type="number"
              value={totalPrice}
              readOnly
              className="input input-bordered w-full bg-base-200 text-base-content"
            />
            <p className="text-sm text-base-content mt-1">
              Unit Price: ৳{initialCrop.pricePerUnit} per {initialCrop.unit}
            </p>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base-content">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="textarea textarea-bordered w-full bg-base-200 text-base-content"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button
            onClick={handleInterestModalOpen}
            type="button"
            className="btn btn-primary w-full"
          >
            Submit Interest
          </button>
        </form>
      )}

      <dialog ref={interestModalRef} className="modal">
        <div className="modal-box bg-base-100 text-base-content">
          <h3 className="font-bold text-lg mb-2">Confirm Your Interest</h3>
          <p>
            Are you sure you want to send interest for{" "}
            <strong>
              {quantity} {initialCrop.name}
            </strong>
            ?
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
