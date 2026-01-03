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
    const sort = url.searchParams.get("sort") || "";
    const page = url.searchParams.get("page") || 1;

    return fetch(
      `http://localhost:3000/crops?search=${search}&sort=${sort}&page=${page}&limit=8`
    );
  },
  Component: AllCrops,
},



      {
        path: "/cropDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/crops/${params.id}`),
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
      {
        path: "/addCrops",
        element: (
          <PrivateRoute>
            <AddCrop></AddCrop>
          </PrivateRoute>
        ),
      },
      {
        path: "/myPosts",
        element: (
          <PrivateRoute>
            <MyPosts></MyPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "/myInterests",
        element: (
          <PrivateRoute>
            <MyInterests></MyInterests>
          </PrivateRoute>
        ),
      },
    ],
  },
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
