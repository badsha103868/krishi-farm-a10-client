import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";




const MySwal = withReactContent(Swal);

const MyPosts = () => {
  const { user }= use(AuthContext)
   const [myCrops, setMyCrops]= useState([])
   
 

     // Delete Crop
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
            if(data.deletedCount){
          Swal.fire({
          title: "Deleted!",
          text: "Your Post has been deleted.",
           icon: "success"
        });
         const remainingCrops = myCrops.filter(crop=> crop._id !== _id)
          setMyCrops(remainingCrops)

            }
          })
          .catch((err) => console.error(err));
      }
    });
  };


   
  useEffect(()=>{
    if(user?.email){
      fetch(`http://localhost:3000/myCrops?email=${user.email}`)
      .then(res => res.json())
      .then(data =>{
        setMyCrops(data)
      })
    }
  },[user?.email])
    


  return (
    <div className="mt-8 p-4 border rounded-xl bg-green-50 shadow-sm my-5">
        <h2 className="text-xl text-center font-bold mb-3 text-green-700">
          My Crop Post
        </h2>
        {
          myCrops.length > 0? ( <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  SL No.
                </th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price/Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              
           {
           myCrops.map((myCrop, index) => <tr key={myCrop._id}>
                <th>
                  {index +1}
                </th>
                <td>                    
                      {myCrop.name}
                </td>
                <td>
                  {myCrop.type}
                </td>
                <td>{myCrop.quantity}</td>
                <td>{myCrop.pricePerUnit}/{myCrop.unit}</td>
                <td>
                  <div className="flex gap-3 mt-2">
                <button className="btn btn-success btn-sm">Edit</button>


                <button onClick={()=> handleDelete(myCrop._id)} className="btn btn-error btn-sm">Delete</button>
                 </div>
              </td>
                
              </tr>)
           }
              
             
            </tbody>
           
           
          </table>
           </div>):(<p className=" text-secondary text-xl text-center">No interests yet.</p>)
        }
         

       
      </div>
  );
};

export default MyPosts;


