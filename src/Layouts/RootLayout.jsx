import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div>
     <Navbar></Navbar>
      <Outlet></Outlet>
      <p>Footer</p>
    </div>
  );
};

export default RootLayout;
