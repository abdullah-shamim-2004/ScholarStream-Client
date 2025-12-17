import React, { useEffect, useState } from "react";
// import { FaGlobe, FaUniversity } from "react-icons/fa";
import ScholarShipCard from "../../../Components/ScholarShipCard/ScholarShipCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios/useAxios";
import Loader from "../../../Components/Loader/Loader";
import { motion as Motion } from "framer-motion";


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
        `/all-scholarships?${params.toString()}`
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
      <div className="bg-white p-4 my-5 rounded-2xl shadow-md border border-gray-200 flex flex-wrap justify-around items-center gap-4">
        {/* Left Filter Label */}
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold shadow-sm">
          <span className="text-lg text-black">⚙️</span> Filter Scholarships
        </button>

        {/* Search bar */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search scholarships..."
          className="input input-bordered rounded-xl w-60 shadow-sm"
        />

        {/* Subject Filter */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <select
          onChange={handleFiter}
          className="select select-bordered rounded-xl w-40 shadow-sm"
        >
          <option disabled selected>
            Subject Category
          </option>
          <option value="STEM">STEM</option>
          <option value="General">General</option>
          <option value="Engineering">Engineering</option>
          <option value="Arts">Arts</option>
          <option value="Business">Business</option>
          <option value="Leadership">Leadership</option>
          <option value="Medical">Medical</option>
        </select>

        {/* Scholarship Category */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <select
          onClick={(e) => setDegree(e.target.value)}
          className="select select-bordered rounded-xl w-40 shadow-sm"
        >
          <option disabled selected>
            Degree
          </option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduate">Graduate</option>
        </select>
        {/* Location Filter */}
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>

        <select
          onChange={(e) => setCountry(e.target.value)}
          className="select select-bordered rounded-xl w-40 shadow-sm"
        >
          <option disabled selected>
            Country
          </option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Singapore">Singapore</option>
          <option value="Canada">Canada</option>
          <option value="Japan">Japan</option>
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
      {isLoading || isFetching ? (
        <Loader></Loader>
      ) : scholarships.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center">
          <h2 className="text-4xl font-bold text-gray-600 mb-3">
            No ScholarShips Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
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
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={page === num + 1 ? "bg-blue-500 px-1.5 text-white" : ""}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllScholarships;
