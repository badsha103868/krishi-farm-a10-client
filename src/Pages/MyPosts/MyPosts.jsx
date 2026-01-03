import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../Loading/Loading";

const MySwal = withReactContent(Swal);

const MyPosts = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentCrop, setCurrentCrop] = useState(null);

  // Fetch user's crops
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:3000/myCrops?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyCrops(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user?.email]);

  // Open edit modal
  const handleEdit = (crop) => {
    setCurrentCrop(crop);
    setEditModalOpen(true);
  };

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/myCrops/${currentCrop._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentCrop),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Crop updated successfully.",
          });
          const updatedCrops = myCrops.map((c) =>
            c._id === currentCrop._id ? currentCrop : c
          );
          setMyCrops(updatedCrops);
          setEditModalOpen(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: data.message || "Update failed.",
          });
        }
      })
      .catch((err) => console.error(err));
  };

  // Handle delete
  const handleDelete = (_id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myCrops/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Post has been deleted.",
                icon: "success",
              });
              const remainingCrops = myCrops.filter((crop) => crop._id !== _id);
              setMyCrops(remainingCrops);
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
     <div className="mt-8 p-4 rounded-xl bg-base-200 shadow-sm my-5">
      <h2 className="text-xl text-center font-bold mb-3 text-primary">
        My Crop Posts
      </h2>

      {myCrops.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price/Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCrops.map((myCrop, index) => (
                <tr key={myCrop._id}>
                  <th>{index + 1}</th>
                  <td>{myCrop.name}</td>
                  <td>{myCrop.type}</td>
                  <td>{myCrop.quantity}</td>
                  <td>
                    {myCrop.pricePerUnit}/{myCrop.unit}
                  </td>
                  <td>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(myCrop)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(myCrop._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-base-content/70 text-center text-lg mt-4">
          No crops found.
        </p>
      )}

      {/* Edit Modal */}
      {editModalOpen && currentCrop && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2 text-base-content">
              Edit Crop
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                className="input w-full"
                value={currentCrop.name}
                onChange={(e) =>
                  setCurrentCrop({ ...currentCrop, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                className="input w-full"
                value={currentCrop.type}
                onChange={(e) =>
                  setCurrentCrop({ ...currentCrop, type: e.target.value })
                }
                required
              />
              <input
                type="number"
                className="input w-full"
                value={currentCrop.pricePerUnit}
                onChange={(e) =>
                  setCurrentCrop({
                    ...currentCrop,
                    pricePerUnit: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                className="input w-full"
                value={currentCrop.unit}
                onChange={(e) =>
                  setCurrentCrop({ ...currentCrop, unit: e.target.value })
                }
                required
              />
              <input
                type="number"
                className="input w-full"
                value={currentCrop.quantity}
                onChange={(e) =>
                  setCurrentCrop({ ...currentCrop, quantity: e.target.value })
                }
                required
              />
              <input
                type="text"
                className="input w-full"
                value={currentCrop.description}
                onChange={(e) =>
                  setCurrentCrop({ ...currentCrop, description: e.target.value })
                }
              />
              <input
                type="text"
                className="input w-full"
                value={currentCrop.location}
                onChange={(e) =>
                  setCurrentCrop({ ...currentCrop, location: e.target.value })
                }
              />
              <input
                type="text"
                className="input w-full"
                value={currentCrop.image}
                onChange={(e) =>
                  setCurrentCrop({ ...currentCrop, image: e.target.value })
                }
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPosts;
