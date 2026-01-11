import React from "react";
import { FaGlobe, FaUniversity } from "react-icons/fa";
import { Link } from "react-router";

const ScholarShipCard = ({ item }) => {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-lg max-w-sm overflow-hidden">
      <figure>
        <img
          src={item.image}
          alt="scholarship"
          className="h-40 w-full object-cover"
        />
      </figure>

      <div className="card-body p-4 gap-1">
        {" "}
        <h2 className="card-title text-base font-bold text-base-content leading-tight">
          {item.scholarshipName}
        </h2>
        {/* University + Country */}
        <div className="flex items-center gap-2 text-xs text-base-content/70 mt-1">
          <FaUniversity className="text-primary" />
          <span className="truncate">{item.universityName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-base-content/70">
          <FaGlobe className="text-secondary" />
          <span>
            {item.city}, {item.country}
          </span>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-base-content/80">
            Category:{" "}
            <span className="font-semibold text-base-content">
              {item.subjectCategory}
            </span>
          </p>

          <p className="text-xs text-base-content/80">
            Application Fee:{" "}
            <span className="font-semibold text-primary">
              ${item.applicationFees}
            </span>
          </p>
        </div>
        {/* Deadline */}
        <div className="mt-2 py-1 px-2 bg-error/10 rounded text-center">
          <p className="text-xs text-error font-bold">
            Deadline: {item.deadline}
          </p>
        </div>
        {/* Button */}
        <div className="card-actions mt-3">
          <Link
            to={`/scholarships/${item._id}`}
            className="btn btn-primary btn-sm btn-block normal-case"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarShipCard;
