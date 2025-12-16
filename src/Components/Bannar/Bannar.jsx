import React from "react";

const Bannar = () => {
  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center rounded-xl"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/rGnX9ZSH/Lucid-Origin-A-modern-professional-website-hero-banner-for-a-s-3.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Find The Best <br /> Scholarships For You
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90">
          Search thousands of fully funded scholarships, grants, and study
          opportunities worldwide.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search scholarships..."
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <button className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bannar;
