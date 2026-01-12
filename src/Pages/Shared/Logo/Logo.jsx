import React from "react";
import { MdSchool } from "react-icons/md";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link
        to="/"
        className="group flex items-center gap-2 transition-all active:scale-95"
      >
        <div className="bg-primary p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
          <MdSchool className="text-white text-xl sm:text-2xl" />
        </div>
        <span className="text-xl sm:text-2xl font-black tracking-tighter flex items-center">
          <span className="text-base-content">Scholar</span>
          <span className="relative">
            <span className="text-primary ml-0.5">Stream</span>

            <span className="absolute -bottom-0.5 left-0.5 w-full h-0.5 sm:h-1 bg-secondary/30 rounded-full"></span>
          </span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
