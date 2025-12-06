import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <p>navbar</p>
      <Outlet></Outlet>
      <p>Footer</p>
    </div>
  );
};

export default RootLayout;
