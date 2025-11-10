import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root/Root";
import AllCrops from "../Pages/AllCrops/AllCrops";

import AddCrop from "../Pages/AddCrop/AddCrop";
import MyPosts from "../Pages/MyPosts/MyPosts";
import MyInterests from "../Pages/MyInterests/MyInterests";
import Profile from "../Pages/Profile/Profile";




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
      Component: AllCrops
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