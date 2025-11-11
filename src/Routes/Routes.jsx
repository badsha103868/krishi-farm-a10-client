import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root/Root";
import AllCrops from "../Pages/AllCrops/AllCrops";

import AddCrop from "../Pages/AddCrop/AddCrop";
import MyPosts from "../Pages/MyPosts/MyPosts";
import MyInterests from "../Pages/MyInterests/MyInterests";
import Profile from "../Pages/Profile/Profile";
import CropDetails from "../Pages/CropDetails/CropDetails";




const router = createBrowserRouter([
  {
   path: "/",
   Component: Root,
   children: [
    {
      index: true,
      Component: Home,
    },
    {
      path: '/allCrops',
       loader:()=>fetch('http://localhost:3000/crops'),
      Component: AllCrops,
      
    },
    {
       path:'/cropDetails',
      Component:CropDetails
    },
    {
      path:'/myProfile',
      Component: Profile
    },
    {
     path: '/addCrops',
     Component: AddCrop
    },
    {
     path: '/myPosts',
     Component: MyPosts
    },
    {
     path: '/myInterests',
     Component: MyInterests
    }, 

   ]
  },
]);

export default router