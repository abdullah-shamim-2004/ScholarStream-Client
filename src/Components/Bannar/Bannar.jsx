import React from "react";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FaSearch, FaArrowRight } from "react-icons/fa";

// Styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { bannerSlides } from "../../../public/bannerSlides";
import Button from "../../Pages/Shared/Button/Button";

const Bannar = () => {
  const { user } = useAuth();

  return (
    <main className="relative min-h-screen lg:min-h-[85vh] flex items-center bg-base-100 overflow-hidden pt-10 lg:pt-0">
      {/* Background Subtle Shapes */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Scholarships for 2026 are open
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1] text-base-content tracking-tighter mb-8">
            Elevate Your <br />
            <span className="text-primary ">Education</span> <br />
            Globally.
          </h1>

          <p className="text-lg text-base-content/60 max-w-lg mb-10 leading-relaxed font-medium">
            Unlock premium scholarship opportunities across the globe. Secure
            your future with our verified application tracking system.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              to="/scholarships"
              text="  Find Scholarships"
              className='uppercase font-bold'
              // className="btn btn-primary btn-lg rounded-2xl px-10 text-white font-black shadow-xl shadow-primary/30 hover:scale-[1.05] transition-all group"
            >
              <FaSearch className="ml-2 group-hover:rotate-12" />
            </Button>

            {!user && (
              <Link
                to="/auth/login"
                className="btn btn-ghost btn-lg rounded-2xl px-10 border border-base-300 hover:bg-base-200 font-bold transition-all"
              >
                Sign In <FaArrowRight className="ml-2 text-xs opacity-40" />
              </Link>
            )}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex items-center gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all">
            <div className="text-[10px] font-black uppercase tracking-[0.2em]">
              Verified by
            </div>
            <div className="flex gap-4 font-black text-sm italic tracking-tighter">
              <span>UNIVERSITY COLLAB</span>
              <span>GLOBAL GRANTS</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side Swiper - Modern Card Look */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative order-1 lg:order-2 w-full max-w-[500px] mx-auto group"
        >
          {/* Animated Background Ring */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl group-hover:scale-110 transition-transform duration-700" />

          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] overflow-hidden border-8 border-base-100"
          >
            {bannerSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-[500px] md:h-[600px] w-full group">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                  />
                  {/* Glassmorphism Content Card */}
                  <div className="absolute inset-x-4 bottom-4 p-6 rounded-[2rem] bg-black/40 backdrop-blur-md border border-white/20 text-white transform transition-all duration-500">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                      Exclusive Opportunity
                    </p>
                    <h3 className="text-2xl font-black mb-1 leading-tight tracking-tight">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-white/70 font-medium tracking-wide leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Floating Element Icon */}
          {/* <div className="absolute -top-8 -right-8 w-24 h-24 bg-white shadow-2xl rounded-3xl flex items-center justify-center p-4 z-20 animate-bounce transition-all hover:scale-110 hidden md:flex">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png"
              alt="Scholarship Icon"
            />
          </div> */}
        </motion.div>
      </div>
    </main>
  );
};

export default Bannar;
