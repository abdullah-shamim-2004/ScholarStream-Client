import React from "react";
import { Link } from "react-router";

const Button = ({ text, to, className }) => {
  return (
    <Link
      to={to}
      className={`btn btn-primary rounded-2xl px-4 py-2 shadow-lg  font-bold shadow-primary/20 tracking-widest text-[12px] hover:scale-[1.05] transition-all group relative overflow-hidden ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
    </Link>
  );
};

export default Button;
