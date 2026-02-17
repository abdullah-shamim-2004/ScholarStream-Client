import React, { useEffect, useState } from "react";
// import { FaGlobe, FaUniversity } from "react-icons/fa";
import ScholarShipCard from "../../../Components/ScholarShipCard/ScholarShipCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios/useAxios";
import Loader from "../../../Components/Loader/Loader";
import { motion as Motion } from "framer-motion";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

const AllScholarships = () => {
  const axiosInstance = useAxios();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [country, setCountry] = useState("");
  const [subject, setSubject] = useState("");
  const [degree, setDegree] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [
      "scholarships",
      debouncedSearch,
      country,
      subject,
      degree,
      limit,
      page,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: debouncedSearch,
        country,
        subject,
        degree,
        limit,
        page,
      });
      const res = await axiosInstance.get(
        `/all-scholarships?${params.toString()}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;

  // input handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  // input handler
  const handleFiter = (e) => {
    setSubject(e.target.value);
    // refetch();
  };

  if (error) return <h2>{error}</h2>;

  return (
    <div className="px-4 py-10">
      {/* Top Filter Bar */}
      <div className="bg-base-100/80 backdrop-blur-md p-4 md:p-6 my-8 rounded-[2rem] shadow-2xl shadow-base-300/20 border border-base-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-center justify-between gap-4">
          {/* Left Filter Label - Fixed Width on Desktop */}
          <div className="flex-none">
            <button className="flex items-center justify-center gap-3 bg-primary text-white w-full lg:w-auto px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
              <span className="text-xl">⚙️</span>
              <span className="whitespace-nowrap uppercase tracking-wider text-xs">
                Filter
              </span>
            </button>
          </div>

          {/* Vertical Divider - Hidden on Mobile */}
          <div className="hidden lg:block h-10 w-[1px] bg-base-300 mx-2"></div>

          {/* Search bar - Grows to fill space */}
          <div className="relative w-full lg:flex-1">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search scholarships..."
              className="input input-bordered bg-base-200/50 border-none focus:ring-2 ring-primary/20 rounded-2xl w-full h-12 shadow-inner pl-4"
            />
          </div>

          {/* Subject Filter */}
          <div className="hidden lg:block h-10 w-[1px] bg-base-300 mx-2"></div>
          <div className="w-full lg:w-44">
            <select
              onChange={handleFiter}
              className="select select-bordered bg-base-200/50 border-none rounded-2xl w-full h-12 shadow-inner font-semibold text-sm"
            >
              <option disabled selected>
                Subject Category
              </option>
              <option value="STEM">STEM</option>
              <option value="General">General</option>
              <option value="Engineering">Engineering</option>
              <option value="Arts">Arts</option>
              <option value="Business">Business</option>
              <option value="Medical">Medical</option>
            </select>
          </div>

          {/* Degree Filter */}
          <div className="hidden lg:block h-10 w-[1px] bg-base-300 mx-2"></div>
          <div className="w-full lg:w-44">
            <select
              onChange={(e) => setDegree(e.target.value)}
              className="select select-bordered bg-base-200/50 border-none rounded-2xl w-full h-12 shadow-inner font-semibold text-sm"
            >
              <option disabled selected>
                Degree
              </option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="hidden lg:block h-10 w-[1px] bg-base-300 mx-2"></div>
          <div className="w-full lg:w-44">
            <select
              onChange={(e) => setCountry(e.target.value)}
              className="select select-bordered bg-base-200/50 border-none rounded-2xl w-full h-12 shadow-inner font-semibold text-sm"
            >
              <option disabled selected>
                Country
              </option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Japan">Japan</option>
            </select>
          </div>

          {/* Optional: Reset Action Button */}
          <div className="lg:ml-2">
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-colors"
              title="Clear Filters"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading || isFetching ? (
        <Loader></Loader>
      ) : scholarships.length === 0 ? (
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center min-h-[60vh] text-center px-6"
        >
          {/* Animated Illustration Icon */}
          <div className="relative mb-8">
            <Motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-32 h-32 md:w-44 md:h-44 bg-base-200 rounded-full flex items-center justify-center text-base-content/10"
            >
              <FaSearch className="text-6xl md:text-8xl" />
            </Motion.div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          </div>

          {/* Text Content */}
          <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter mb-4">
            No Scholarships Found
          </h2>
          <p className="text-base-content/50 max-w-md mx-auto mb-10 font-medium leading-relaxed">
            We couldn't find any results matching your current filters. Try
            adjusting your search or explore other categories.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary px-8 rounded-2xl text-white font-bold shadow-xl shadow-primary/30"
            >
              Refresh Search
            </button>
            {/* logic to clear filters  */}
            <button
              onClick={() => {}}
              className="btn btn-ghost hover:bg-base-200 px-8 rounded-2xl font-bold flex items-center gap-2"
            >
              <FaArrowLeft className="text-xs" /> Clear All Filters
            </button>
          </div>
        </Motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {scholarships.map((item, index) => (
            <Motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ScholarShipCard key={index} item={item}></ScholarShipCard>
            </Motion.div>
          ))}
        </div>
      )}
      <div className="flex gap-2 mt-6 justify-center">
        {page > 1 && (
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <GrPrevious />
          </button>
        )}

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={page === num + 1 ? "bg-blue-500 px-1.5 text-white" : ""}
          >
            {num + 1}
          </button>
        ))}
        {page < totalPages && (
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <GrNext />
          </button>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
