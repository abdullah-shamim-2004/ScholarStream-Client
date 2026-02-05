import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaGraduationCap,
  FaGlobe,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import Button from "../../Pages/Shared/Button/Button";

const BookBanner = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // const scholarshipStats = [
  //   { icon: FaGraduationCap, value: "15K+", label: "Scholarships" },
  //   { icon: FaGlobe, value: "120+", label: "Countries" },
  //   { icon: FaAward, value: "$2.5B", label: "Awarded" },
  //   { icon: FaUsers, value: "50K+", label: "Students Helped" },
  // ];

  const bookPages = [
    {
      id: 1,
      university: "Harvard University",
      program: "Full-Ride Merit Scholarship",
      amount: "$75,000/year",
      deadline: "March 2026",
      description:
        "Covers tuition, housing, and living expenses for exceptional students",
      country: "United States",
      image:
        "https://i.ibb.co.com/Ld0PC9vg/Gemini-Generated-Image-25qh8t25qh8t25qh.pnghttps://i.ibb.co.com/sample3.jpg",
      color: "from-red-500 to-orange-500",
    },
    {
      id: 2,
      university: "Oxford University",
      program: "Rhodes Scholarship",
      amount: "Full Tuition + Stipend",
      deadline: "April 2026",
      description: "World's most prestigious postgraduate scholarship program",
      country: "United Kingdom",
      image:
        "https://i.ibb.co.com/7d7GrgDS/Gemini-Generated-Image-tse1vltse1vltse1.png",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      university: "Stanford University",
      program: "Knight-Hennessy Scholars",
      amount: "$90,000/year",
      deadline: "May 2026",
      description: "Graduate-level scholarship for future global leaders",
      country: "United States",
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      university: "Cambridge University",
      program: "Gates Cambridge Scholarship",
      amount: "Full Cost Coverage",
      deadline: "June 2026",
      description: "For outstanding applicants from outside the UK",
      country: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800",
      color: "from-green-500 to-teal-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handlePageTurn();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const handlePageTurn = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % bookPages.length);
      setIsFlipping(false);
    }, 700);
  };

  const handleDotClick = (index) => {
    if (index !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(index);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <main className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-base-100 via-base-200 to-base-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            {/* <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold uppercase tracking-wider mb-8 shadow-lg"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              2026 Applications Now Open
            </motion.div> */}

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] text-base-content mb-6">
              Your Dream
              <br />
              <span className="text-primary ">Scholarship</span>
              <br />
              Awaits
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-base-content/70 max-w-xl mb-10 leading-relaxed font-medium">
              Connect with{" "}
              <span className="text-primary font-bold">15,000+</span> verified
              scholarship opportunities worldwide. Your education journey starts
              here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <Button
                to="/scholarships"
                text="Explore Scholarships"
                className="uppercase font-bold group"
              >
                <FaSearch className="ml-2 group-hover:scale-110 transition-transform" />
              </Button>

              {!user && (
                <Link
                  to="/auth/login"
                  className="btn btn-outline btn-lg rounded-2xl px-8 hover:bg-base-content hover:text-base-100 font-bold transition-all"
                >
                  Sign In to Apply
                </Link>
              )}
            </div>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {scholarshipStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="text-3xl text-primary mx-auto mb-2" />
                  <div className="text-2xl font-black text-base-content">
                    {stat.value}
                  </div>
                  <div className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

          {/* Right Side - 3D Book */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className="relative h-[600px] flex items-center justify-center">
              {/* Book Container */}
              <div
                className="relative w-full max-w-[450px]"
                style={{ perspective: "2000px" }}
              >
                {/* Book Shadow */}
                <div className="absolute inset-0 top-8 bg-gradient-to-b from-transparent to-black/20 blur-2xl" />

                {/* The Book */}
                <div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Book Spine */}
                  <div
                    className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-amber-800 to-amber-900 rounded-l-lg shadow-2xl z-10"
                    style={{ transform: "translateX(-100%)" }}
                  >
                    <div className="h-full flex items-center justify-center">
                      <div className="text-white text-xs font-bold writing-mode-vertical transform rotate-180 tracking-widest">
                        SCHOLARSHIPS 2026
                      </div>
                    </div>
                  </div>

                  {/* Book Cover (Back) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-r-2xl shadow-2xl border-4 border-amber-900/50" />

                  {/* Flipping Page */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: isFlipping ? -180 : 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="relative w-full h-[600px] bg-base-100 rounded-r-2xl shadow-2xl overflow-hidden"
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "left center",
                      }}
                    >
                      {/* Page Content */}
                      <div
                        className="absolute inset-0 p-8 flex flex-col"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        {/* Page Number */}
                        <div className="text-right text-sm text-base-content/40 font-semibold mb-4">
                          Page {currentPage + 1} of {bookPages.length}
                        </div>

                        {/* Scholarship Image */}
                        <div className="relative h-48 rounded-xl overflow-hidden mb-6 shadow-lg">
                          <img
                            src={bookPages[currentPage].image}
                            alt={bookPages[currentPage].university}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div
                            className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${bookPages[currentPage].color} text-white text-xs font-bold shadow-lg`}
                          >
                            Featured
                          </div>
                        </div>

                        {/* University Name */}
                        <h3 className="text-2xl font-black text-secondary mb-2 leading-tight">
                          {bookPages[currentPage].university}
                        </h3>

                        {/* Program Name */}
                        <p className="text-lg font-bold text-primary mb-3">
                          {bookPages[currentPage].program}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-base-content/70 mb-4 leading-relaxed">
                          {bookPages[currentPage].description}
                        </p>

                        {/* Details Grid */}
                        <div className="mt-auto space-y-3">
                          <div className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                              Award Amount
                            </span>
                            <span className="text-lg font-semibold text-primary">
                              {bookPages[currentPage].amount}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                              Deadline
                            </span>
                            <span className="text-lg font-semibold text-secondary">
                              {bookPages[currentPage].deadline}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                              Country
                            </span>
                            <span className="text-sm font-semibold text-base-content">
                              {bookPages[currentPage].country}
                            </span>
                          </div>
                        </div>

                        {/* Page Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />
                      </div>

                      {/* Back of Page (visible when flipping) */}
                      <div
                        className="absolute inset-0 bg-amber-50 rounded-r-2xl"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      ></div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Book Edge Effect */}
                  <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-r-sm shadow-inner" />
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {bookPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    disabled={isFlipping}
                    className={`h-2.5 rounded-full transition-all ${
                      currentPage === index
                        ? "w-12 bg-primary"
                        : "w-2.5 bg-base-content/30 hover:bg-base-content/50"
                    } ${isFlipping ? "cursor-not-allowed" : "cursor-pointer"}`}
                  />
                ))}
              </div>

              {/* Floating Bookmark */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 right-20 w-8 h-32 bg-gradient-to-b from-red-500 to-red-600 shadow-lg z-20"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
                }}
              />

              {/* Floating Icons */}
              {/* <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -left-8 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-xl hidden lg:flex"
              >
                <FaGraduationCap className="text-3xl text-white" />
              </motion.div> */}
              {/* 
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-xl hidden lg:flex"
              >
                <FaAward className="text-3xl text-white" />
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Styles for vertical text */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </main>
  );
};

export default BookBanner;
