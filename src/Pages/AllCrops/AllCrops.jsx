import React, { Suspense, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import AllCrop from './AllCrop';
import logoImg from '../../assets/logoFarm2.jpeg'
import { MdErrorOutline } from 'react-icons/md';
const AllCrops = () => {
  const data = useLoaderData()
  console.log(data)

   const [searchValue, setSearchValue] = useState('')
   const [loading, setLoading] = useState(false)
    
  const handleSearch=(e)=>{
    const value = e.target.value;
    setSearchValue(value) 
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  } 
 
    
  
  // filterData
 const filteredData = data.filter(cropData => cropData.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))



  return (
   <div>  

     <div>
       <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-2 mt-5'> Our <span className='text-secondary'>All Crops</span></h2> 
       
     </div>

      <div className='flex justify-between items-center mt-5 md:mt-10  mb-5 p-2'>
         
      <p className='font-medium md:font-semibold text-xl md:text-2xl '>Crops Found <span className='text-primary'>({filteredData.length})</span></p>

        {/* search field */}

      <label className="input input-sm w-40 md:w-50 lg:w-64 max-w-xs flex items-center gap-2">
      <svg
       className="h-4 w-4 opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
       >
     <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
      >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
     </svg>
    <input
     type="search"
     required
     placeholder="Search Crops" 
     value={searchValue}
     onChange={handleSearch}
     className="text-sm py-1 px-2 w-full"
      />
      </label>
      </div>
      {/* search ar por loading showing */}
      {
        loading?(<div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50 ">
         <span className='text-4xl font-bold'>L</span>
         <img src={logoImg} alt="Loading..."  className="w-10 h-10 animate-spin m-2" /> 
         <span className='text-4xl font-bold'>A D I N G</span></div>):
          
         
         ( <Suspense fallback={<span>Loading....</span>}>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6  '>
           
           {
            filteredData.length > 0 ? (
               
           filteredData.map(crop=> <AllCrop key={crop._id} crop={crop}></AllCrop>) ): (
            <div className='flex flex-col col-span-full mt-10  justify-center  items-center'> 

               <MdErrorOutline className='text-6xl text-red-500 mb-4' />

            <p className="text-center col-span-full text-red-500 text-5xl mb-5">No Result Found</p>
 

           
            </div>
           )
      
            
           }
      
         
       </div>
       
     </Suspense>)
      }



     

    
      
    </div>

   

   
  );
};

export default AllCrops;