import React from "react";
import { FaGlobe, FaUniversity } from "react-icons/fa";
import { Link } from "react-router";

const ScholarShipCard = ({ item }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl  h-full">
      <figure>
        <img
          src={item.image}
          alt="scholarship"
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-lg font-semibold">
          {item.scholarshipName}
        </h2>

        {/* University + Country */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <FaUniversity />
          <span>{item.universityName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <FaGlobe />
          <span>
            {item.city}, {item.country}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Category:{" "}
          <span className="font-semibold">{item.subjectCategory}</span>
        </p>

        <p className="text-sm text-gray-500">
          Application Fee:{" "}
          <span className="font-semibold">{item.applicationFees}$</span>
        </p>

        {/* Deadline */}
        <p className="mt-2 text-red-500 font-medium">
          Deadline: {item.deadline}
        </p>

        {/* Buttons */}
        <div className="card-actions mt-4">
          <Link
            to={`/scholarships/${item._id}`}
            className="btn btn-primary btn-sm w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarShipCard;
