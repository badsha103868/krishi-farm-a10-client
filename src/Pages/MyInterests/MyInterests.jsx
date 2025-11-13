import React, { use, useEffect, useState,  } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";


const MyInterests = () => {
  const { user } = use(AuthContext);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/myInterests?email=${user.email}`)
        .then(res => res.json())
        .then(data => setInterests(data))
        .catch(err => console.error(err));
    }
  }, [user?.email]);

  return (
    <div className="mt-8 p-4 border rounded-xl bg-green-50 shadow-sm my-5">
      <h2 className="text-xl font-bold text-center mb-4 text-green-700">
        My Interests
      </h2>

      {interests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Crop Name</th>
                <th>Owner</th>
                <th>Quantity Requested</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {interests.map((item, index) => (
                <tr key={item.cropId}>
                  <th>{index + 1}</th>
                  <td>{item.cropName}</td>
                  <td>{item.ownerName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.message}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "pending"
                          ? "badge-warning"
                          : item.status === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-secondary text-xl">
          No interests sent yet.
        </p>
      )}
    </div>
  );
};

export default MyInterests;
