import React from "react";
import useSecure from "../../../Hooks/useSecure/useSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { FaUsers, FaGraduationCap, FaDollarSign } from "react-icons/fa";
import UniversityPieChart from "../../../Components/UniversityPieChart/UniversityPieChart";

const DataAnalytics = () => {
  const axiosSecure = useSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics");
      return res.data;
    },
  });
  const totalUsers = data?.totalUsers || 0;
  const totalScholarships = data?.totalScholarships || 0;
  const totalRevenue = data?.totalRevenue || 0;
  const universityData = data?.Data || 0;
  console.log(totalUsers, totalScholarships, totalRevenue, universityData);
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-center w-full mt-8 mx-auto">
        {/* Total Users Card */}
        <div className="flex items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-64">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
            <FaUsers className="text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <span className="text-2xl font-bold text-gray-800">
              {totalUsers}
            </span>
          </div>
        </div>

        {/* Total Scholarships Card */}
        <div className="flex items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-64">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <FaGraduationCap className="text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Scholarships</h2>
            <span className="text-2xl font-bold text-gray-800">
              {totalScholarships}
            </span>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="flex items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-64">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <FaDollarSign className="text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Total Revenue</h2>
            <span className="text-2xl font-bold text-gray-800">
              ${totalRevenue}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 md:px-3">
        <UniversityPieChart universityData={universityData} />
      </div>
    </div>
  );
};

export default DataAnalytics;
