import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto items-center">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
