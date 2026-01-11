import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios/useAxios";
import Loader from "../Loader/Loader";
import {
  FaAward,
  FaCalendarAlt,
  FaGlobe,
  FaMoneyBillWave,
  FaUniversity,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ScholarShipDetails = () => {
  const { id } = useParams();

  const axiosInstance = useAxios();
  //   scholarship fetching
  const { data: scholarship = [], isLoading: scholarshipLoading } = useQuery({
    queryKey: ["singleScholarship", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/scholarships/${id}`);
      return res.data;
    },
  });
  // review fatching
  const { data: reviews = [], isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews/${id}`);
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
    // applicationFees,
    serviceCharge,
    deadline,
    postDate,
  } = scholarship;

  // Loader
  if (scholarshipLoading || reviewLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* --- HERO SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-base-100 rounded-[2.5rem] shadow-sm overflow-hidden border border-base-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Side */}
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt="University"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent " />
              <div className="absolute bottom-6 left-6 lg:hidden">
                <span className="badge badge-primary p-4 font-bold">
                  World Rank: #{worldRank}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                  {scholarshipCategory}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest">
                  {degree}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-base-content leading-tight mb-6">
                {scholarshipName}
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <FaUniversity className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50 leading-none">
                      Institution
                    </p>
                    <p className="text-lg font-bold text-base-content">
                      {universityName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <FaGlobe className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50 leading-none">
                      Location
                    </p>
                    <p className="text-lg font-bold text-base-content">
                      {city}, {country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-base-200/50 rounded-3xl border border-base-300">
                <div>
                  <p className="text-xs font-bold text-error uppercase mb-1 flex items-center gap-1">
                    <FaCalendarAlt /> Deadline
                  </p>
                  <p className="text-xl font-black text-base-content">
                    {deadline}
                  </p>
                </div>
                <Link
                  to={`/payment/${_id}`}
                  className="btn btn-primary btn-lg rounded-2xl px-10 shadow-lg shadow-primary/30 text-white border-none hover:scale-105 transition-transform"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- INFO TILES --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "Subject",
              value: subjectCategory,
              icon: <FaAward />,
              color: "text-blue-500",
            },
            {
              label: "Posted",
              value: postDate,
              icon: <FaCalendarAlt />,
              color: "text-green-500",
            },
            {
              label: "Tuition",
              value: `$${tuitionFees}`,
              icon: <FaMoneyBillWave />,
              color: "text-amber-500",
            },
            {
              label: "Service",
              value: `$${serviceCharge}`,
              icon: <FaMoneyBillWave />,
              color: "text-purple-500",
            },
          ].map((item, i) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={i}
              className="bg-base-100 p-6 rounded-[2rem] shadow-xl border border-base-200 text-center"
            >
              <div
                className={`mx-auto w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-xl mb-3 ${item.color}`}
              >
                {item.icon}
              </div>
              <p className="text-xs font-bold text-base-content/40 uppercase tracking-tighter">
                {item.label}
              </p>
              <p className="text-lg font-black text-base-content truncate">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-3xl font-black text-base-content tracking-tight">
              Student Feedback
            </h2>
            <div className="h-1 flex-1 mx-6 bg-gradient-to-r from-primary/20 to-transparent rounded-full hidden md:block" />
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-200 relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="avatar">
                    <div className="w-14 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={review.userImage} alt={review.userName} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-base-content">
                      {review.userName}
                    </h4>
                    <p className="text-xs text-base-content/50 uppercase font-bold tracking-widest">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-base-content/70 italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating ? "text-primary" : "text-base-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarShipDetails;
