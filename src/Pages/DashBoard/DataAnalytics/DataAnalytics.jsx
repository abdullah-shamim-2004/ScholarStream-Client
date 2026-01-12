import React from "react";
import useSecure from "../../../Hooks/useSecure/useSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { FaUsers, FaGraduationCap, FaDollarSign } from "react-icons/fa";
import UniversityPieChart from "../../../Components/UniversityPieChart/UniversityPieChart";
import { motion } from "framer-motion";

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
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8 max-w-7xl mx-auto px-4">
        {/* --- Total Users Card --- */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative overflow-hidden flex items-center p-8 bg-base-100 border border-base-200 rounded-[2rem] shadow-xl shadow-base-300/20 group transition-all"
        >
          {/* Background Decorative Shape */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

          <div className="flex items-center gap-5 relative z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 text-white">
              <FaUsers className="text-3xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-1">
                Community
              </p>
              <h2 className="text-sm font-bold text-base-content/60 leading-tight mb-1">
                Total Users
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-base-content tracking-tighter">
                  {totalUsers?.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-success">+12%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Total Scholarships Card --- */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative overflow-hidden flex items-center p-8 bg-base-100 border border-base-200 rounded-[2rem] shadow-xl shadow-base-300/20 group transition-all"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

          <div className="flex items-center gap-5 relative z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 text-white">
              <FaGraduationCap className="text-3xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-1">
                Opportunities
              </p>
              <h2 className="text-sm font-bold text-base-content/60 leading-tight mb-1">
                Scholarships
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-base-content tracking-tighter">
                  {totalScholarships}
                </span>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Total Revenue Card --- */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative overflow-hidden flex items-center p-8 bg-base-100 border border-base-200 rounded-[2rem] shadow-xl shadow-base-300/20 group transition-all"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-sky-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

          <div className="flex items-center gap-5 relative z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-lg shadow-sky-200 text-white">
              <FaDollarSign className="text-3xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-1">
                Financials
              </p>
              <h2 className="text-sm font-bold text-base-content/60 leading-tight mb-1">
                Total Revenue
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-sky-600">$</span>
                <span className="text-3xl font-black text-base-content tracking-tighter">
                  {totalRevenue?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-5 md:px-3">
        <UniversityPieChart universityData={universityData} />
      </div>
    </div>
  );
};

export default DataAnalytics;
