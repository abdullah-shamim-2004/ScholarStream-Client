import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Navbar></Navbar>
      <ScrollToTop />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
