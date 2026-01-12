import React from "react";
import useRole from "../../../Hooks/useRole/useRole";
import useAuth from "../../../Hooks/useAuth/useAuth";
import {
  MdAdminPanelSettings,
  MdSchool,
  MdOutlineExplore,
} from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Loader from "../../../Components/Loader/Loader";

const DashBoardHome = () => {
  const { role } = useRole();
  const { user, loading } = useAuth();

  const roleConfig = {
    admin: {
      title: "Administrator",
      subtitle: "System-wide control & analytics enabled.",
      icon: <MdAdminPanelSettings />,
      color: "text-indigo-400",
      accent: "bg-indigo-500",
      gradient: "from-indigo-600 to-violet-700",
    },
    moderator: {
      title: "Content Moderator",
      subtitle: "Application review & quality control active.",
      icon: <RiShieldUserFill />,
      color: "text-emerald-400",
      accent: "bg-emerald-500",
      gradient: "from-emerald-600 to-teal-700",
    },
    student: {
      title: "Scholarship Aspirant",
      subtitle: "Track your journey and applications.",
      icon: <MdSchool />,
      color: "text-sky-400",
      accent: "bg-sky-500",
      gradient: "from-sky-600 to-blue-700",
    },
  };

  const current = roleConfig[role || "student"];

  if (loading) return <Loader />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] bg-base-100 border border-base-200 shadow-2xl shadow-base-300/20"
      >
        {/* Top Decorative Gradient Banner */}
        <div
          className={`h-32 w-full bg-gradient-to-r ${current.gradient} opacity-90`}
        />

        <div className="px-8 pb-10">
          {/* Avatar and Header Section */}
          <div className="relative -mt-12 flex flex-col md:flex-row md:items-end gap-6 mb-8">
            <div className="relative inline-block">
              <div className="avatar">
                <div className="w-24 md:w-32 rounded-3xl ring-8 ring-base-100 shadow-2xl">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="User Profile"
                  />
                </div>
              </div>
              <div
                className={`absolute -bottom-2 -right-2 p-2 rounded-xl text-white shadow-lg ${current.accent}`}
              >
                {React.cloneElement(current.icon, { size: 20 })}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tighter">
                  {user?.displayName || "User"}
                </h1>
                <span
                  className={`hidden md:inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-base-200 ${current.color}`}
                >
                  {role || "student"}
                </span>
              </div>
              <p className="text-base-content/50 font-medium text-sm md:text-base italic">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Main Info Card */}
            <div className="p-6 rounded-3xl bg-base-200/50 border border-base-300">
              <h3 className="text-sm font-black text-base-content/40 uppercase tracking-widest mb-4">
                Dashboard Overview
              </h3>
              <p className="text-xl font-bold text-base-content mb-2">
                {current.title}
              </p>
              <p className="text-sm text-base-content/60 leading-relaxed font-medium">
                {current.subtitle}
              </p>
            </div>

            {/* Quick Action/Tip Card */}
            <div className="p-6 rounded-3xl bg-base-200/50 border border-base-300 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-base-content/40 uppercase tracking-widest mb-4">
                  Quick Tip
                </h3>
                <p className="text-sm text-base-content/60 font-medium leading-relaxed">
                  Navigating through the system is easy. Use the sidebar to
                  access specialized tools.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider cursor-pointer hover:underline">
                <MdOutlineExplore size={16} /> Explore Features
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-base-200/80 px-8 py-3 flex justify-between items-center border-t border-base-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">
              System Online
            </span>
          </div>
          <p className="text-[10px] font-bold text-base-content/30 uppercase tracking-widest">
            Account ID: {user?.uid?.slice(0, 8)}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DashBoardHome;
