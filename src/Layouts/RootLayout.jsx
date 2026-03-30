import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import Scholarstreamchat from "../Pages/AiChat/Scholarstreamchat";
import { useLocation, Outlet } from "react-router";

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Navbar></Navbar>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Outlet />
        </Motion.div>
      </AnimatePresence>

      <Scholarstreamchat />
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
