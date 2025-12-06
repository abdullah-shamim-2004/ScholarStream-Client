import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
     <Navbar></Navbar>
      <Outlet></Outlet>
      <p>Footer</p>
    </div>
  );
};

export default RootLayout;
