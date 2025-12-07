import React from "react";
import { FaGlobe, FaUniversity } from "react-icons/fa";
import { useLoaderData } from "react-router";
import ScholarShipCard from "../../../Components/ScholarShipCard/ScholarShipCard";

const AllScholarships = () => {
  const scholarship = useLoaderData();
  console.log(scholarship);

  return (
    <div className="px-4 py-10">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 my-5 rounded-2xl shadow-md border border-gray-200 flex flex-wrap items-center gap-4">
        {/* Left Filter Label */}
        <button className="flex items-center gap-2 bg-neutral text-white px-5 py-3 rounded-xl font-semibold shadow-sm">
          <span className="text-lg">⚙️</span> Filter Scholarships
        </button>

        {/* Search bar */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <input
          type="text"
          placeholder="Search scholarships..."
          className="input input-bordered rounded-xl w-60 shadow-sm"
        />

      

        {/* Subject Filter */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <select className="select select-bordered rounded-xl w-40 shadow-sm">
          <option disabled selected>
            Subject Category
          </option>
          <option>Engineering</option>
          <option>Business</option>
          <option>Computer Science</option>
          <option>Medical</option>
          <option>Arts</option>
        </select>

        {/* Scholarship Category */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <select className="select select-bordered rounded-xl w-40 shadow-sm">
          <option disabled selected>
            Scholarship Type
          </option>
          <option>Fully Funded</option>
          <option>Partially Funded</option>
          <option>Tuition Waiver</option>
          <option>Fellowship</option>
        </select>
          {/* Location Filter */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <select className="select select-bordered rounded-xl w-40 shadow-sm">
          <option disabled selected>
            Country
          </option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Germany</option>
          <option>Australia</option>
        </select>

        {/* Search Button */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        {/* <button className="flex items-center gap-2 bg-neutral text-white px-6 py-3 rounded-xl font-medium shadow-md">
          <span>🔍</span> Search
        </button> */}

        {/* Clear Filter */}
        {/* <button className="px-6 py-3 rounded-xl border border-gray-400 text-gray-700 font-medium hover:bg-gray-100 duration-200">
          Clear Filter
        </button> */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {scholarship.map((item, index) => (
          <ScholarShipCard key={index} item={item}></ScholarShipCard>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
