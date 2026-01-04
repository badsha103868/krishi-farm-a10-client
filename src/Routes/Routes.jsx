import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root/Root";
import AllCrops from "../Pages/AllCrops/AllCrops";

import AddCrop from "../Pages/AddCrop/AddCrop";
import MyPosts from "../Pages/MyPosts/MyPosts";
import MyInterests from "../Pages/MyInterests/MyInterests";
import Profile from "../Pages/Profile/Profile";
import CropDetails from "../Pages/CropDetails/CropDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../Provider/PrivateRoute/PrivateRoute";
import UpdateForm from "../Pages/Profile/UpdateForm";
import DashboardLayout from "../Layout/DashboardLayout";

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
        path: "/allCrops",
        loader: ({ request }) => {
          const url = new URL(request.url);

          const search = url.searchParams.get("search") || "";
          const type = url.searchParams.get("type") || "";
          const sort = url.searchParams.get("sort") || "";
          const page = url.searchParams.get("page") || 1;

          return fetch(
            `https://krishi-farm-a10-server.vercel.app/crops?search=${search}&type=${type}&sort=${sort}&page=${page}&limit=8`
          );
        },
        Component: AllCrops,
      },

      {
        path: "/cropDetails/:id",
        loader: ({ params }) =>
          fetch(`https://krishi-farm-a10-server.vercel.app/crops/${params.id}`),
        element: <CropDetails></CropDetails>,
      },
      {
        path: "/myProfile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateForm",
        element: <UpdateForm></UpdateForm>,
      },
      
    ],
  },
 {
  path: "/dashboard",
  element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
  children: [
    { index: true, element: <DashboardOverview /> },
    { path: "myProfile", element: <Profile /> },
    { path: "myPosts", element: <MyPosts /> },
    { path: "myInterests", element: <MyInterests /> },
  ]
}
,
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
 
  
  

  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
