import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios/useAxios";
import Loader from "../Loader/Loader";

const ScholarShipDetails = () => {
  const { id } = useParams();

  const axiosInstance = useAxios();
  //   data fetching
  const {
    data: scholarship = [],
    isLoading,
    // isSuccess
  } = useQuery({
    queryKey: ["singleScholarship", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/scholarships/${id}`);
      return res.data;
    },
  });
  const {
    _id,
    scholarshipName,
    universityName,
    image,
    country,
    city,
    worldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    deadline,
    postDate,
  } = scholarship;
  if (isLoading) {
    return <Loader></Loader>;
  }
  //   console.log(scholarship);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl p-8 border">
        {/* LEFT: Image */}
        <div>
          <img
            src={image}
            className="w-full h-[350px] object-cover rounded-xl shadow-md"
            alt="Scholarship Banner"
          />
        </div>

        {/* RIGHT: Basic Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3 text-gray-800">
            {scholarshipName}
          </h1>
          <p className="text-lg font-semibold text-neutral">{universityName}</p>
          <p className="mt-1 text-gray-600">
            {city}, {country}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-xl">
              <p className="font-bold">World Rank</p>
              <p>{worldRank}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              <p className="font-bold">Degree</p>
              <p>{degree}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              <p className="font-bold">Category</p>
              <p>{scholarshipCategory}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              <p className="font-bold">Subject</p>
              <p>{subjectCategory}</p>
            </div>
          </div>

          <div className="mt-6 ">
            <p className="font-semibold">Deadline:</p>
            <p className="text-red-600 font-bold">{deadline}</p>

            <p className="font-semibold mt-3">Posted On:</p>
            <p>{postDate}</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-2xl shadow-xl mt-8 p-8 border">
        <h2 className="text-2xl font-bold mb-4">Scholarship Details</h2>

        {/* {description ? (
          <p className="text-gray-700 leading-relaxed">{description}</p>
        ) : (
          <p className="text-gray-500">No description available.</p>
        )} */}

        <h3 className="text-xl font-semibold mt-6">Financial Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="p-4 bg-gray-100 rounded-xl">
            <p className="font-bold">Tuition Fees</p>
            <p>${tuitionFees}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl">
            <p className="font-bold">Application Fees</p>
            <p>${applicationFees}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl">
            <p className="font-bold">Service Charge</p>
            <p>${serviceCharge}</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-8">
        <Link
          to={`/payment/${_id}`}
          className="btn btn-primary px-10 text-white"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default ScholarShipDetails;
