import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Pages/Loading/Loading";

const Root = () => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <>
      <Navbar />

      {isNavigating && <Loading />}

      <div className="w-11/12 mx-auto min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Root;
