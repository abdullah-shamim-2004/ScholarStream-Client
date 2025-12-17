import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios/useAxios";
import Loader from "../../../Components/Loader/Loader";
import ScholarShipCard from "../../../Components/ScholarShipCard/ScholarShipCard";
import { Link } from "react-router";
import { motion as Motion } from "framer-motion";

const TopScholarships = () => {
  const axiosInstance = useAxios();
  const {
    data,
    isLoading,
    // isFetching,
    // error,
  } = useQuery({
    queryKey: ["AllScholarship"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/all-scholarships?limit=${6}&sort=top`
      );
      return res.data;
    },
    enabled: true,
  });
  const scholarships = data?.scholarships || [];
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" bg-[#EEF3F7] py-10 px-4 md:px-8 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
        <div className="mb-2">
          <h6 className="uppercase tracking-wider text-sm text-gray-500 mb-2">
            {" "}
            — Top Scholarships
          </h6>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 ">
            Featured Scholarships
          </h2>
          <p className="text-s text-gray-600 max-w-xl mt-2 ">
            Discover the best scholarships selected to help you achieve your
            academic goals with proper guidance, benefits, and financial
            support.
          </p>
        </div>
        <div>
          <Link
            to="/scholarships"
            className="inline-flex bg-primary items-center px-6 py-3 text-white rounded-full font-medium"
          >
            Explore All Scholarships
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10">
        {scholarships.map((item, index) => (
          <Motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ScholarShipCard item={item}></ScholarShipCard>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopScholarships;
