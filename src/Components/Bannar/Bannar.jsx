import React from "react";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth/useAuth";

const Bannar = () => {
  const { user } = useAuth();
  return (
    <main className="relative min-h-[90vh] max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden lg:overflow-visible">
      {/* Left Side: Content */}
      <div className="z-10 order-2 lg:order-1">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8 text-base-content">
          Find Your <br />
          <span className="text-primary">Dream Scholarship</span> <br />
          With Confidence
        </h1>

        <p className="text-lg text-gray-500 max-w-md leading-relaxed mb-10">
          Discover global scholarships, apply securely, and track your
          application status — all in one powerful platform designed for
          students.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          {/* Primary CTA */}
          <Link
            to="/scholarships"
            className="bg-primary text-white px-10 py-4 rounded-full text-md font-medium shadow-xl hover:bg-primary/90 transition-all active:scale-95"
          >
            Search Scholarships
          </Link>

          {/* Secondary CTA */}
          {!user && (
            <Link
              to="/auth/login"
              className="border border-gray-300 text-gray-800 px-10 py-4 rounded-full text-md font-medium hover:bg-gray-100 transition-all active:scale-95"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mt-12 lg:mt-0">
        {/* Decorative Frame */}
        <div className="absolute top-[-20px] right-[10%] lg:right-[40px] w-[80%] h-[95%] border border-gray-300 z-0"></div>

        {/* Main Image */}
        <div className="relative z-10 w-full max-w-[400px] aspect-[4/5] lg:w-[450px] lg:h-[550px] bg-primary overflow-hidden shadow-2xl rounded-xl">
          <img
            src="https://i.ibb.co.com/7d7GrgDS/Gemini-Generated-Image-tse1vltse1vltse1.png?auto=format&fit=crop&q=80&w=900"
            alt="Scholarship Students"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Accent Shape */}
        <div className="absolute bottom-[-30px] right-[-10px] lg:right-[-20px] w-40 h-20 lg:w-48 lg:h-24 bg-primary/80 rounded-t-full rotate-[-45deg] z-20"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center space-y-2 opacity-40">
        <div className="w-5 h-9 border-2 border-black rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-black rounded-full animate-bounce"></div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Scroll down
        </span>
      </div>
    </main>
  );
};

export default Bannar;
