import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Loading from "../Loading/Loading";

const MyInterests = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (user?.email) {
      setLoading(true)
      fetch(`http://localhost:3000/myInterests?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
           setInterests(data) 
          setLoading(false)
        })
        .catch((err) =>{
          console.error(err)
          setLoading(false)
        } )
    }
  }, [user?.email]);

  // Sorting by crop name
  const handleSort = () => {
    const sorted = [...interests].sort((a, b) => {
      if (a.cropName.toLowerCase() < b.cropName.toLowerCase()) return sortOrder === "asc" ? -1 : 1;
      if (a.cropName.toLowerCase() > b.cropName.toLowerCase()) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setInterests(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
    if(loading){
      return <Loading></Loading>
      
     
    }
  return (
    <div className="mt-8 p-4 border rounded-xl bg-green-50 shadow-sm my-5">
      <h2 className="text-xl font-bold text-center mb-4 text-green-700">
        My Interests
      </h2>

      {interests.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="mb-2 flex justify-end">
            <button
              className="btn btn-sm btn-outline"
              onClick={handleSort}
            >
              Sort by Crop Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
            </button>
          </div>
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
