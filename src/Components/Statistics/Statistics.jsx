import React from "react";
import { motion as Motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBookOpen,
  FaGlobeAmericas,
  FaChartLine,
} from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";

// Updated Data with React Icons
const statsData = [
  {
    id: 1,
    title: "Students Helped",
    value: "12,000+",
    desc: "Achieved academic dreams via our platform",
    icon: <FaGraduationCap />,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Scholarships Listed",
    value: "850+",
    desc: "Verified local & international opportunities",
    icon: <FaBookOpen />,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    title: "Funds Awarded",
    value: "$5M+",
    desc: "Distributed worldwide to deserving talent",
    icon: <HiCurrencyDollar />,
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "Countries Covered",
    value: "25+",
    desc: "Global reach spanning across continents",
    icon: <FaGlobeAmericas />,
    color: "bg-purple-500",
  },
];

const Statistics = () => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4"
          >
            <FaChartLine /> Real-time Impact
          </Motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter mb-6">
            Our Impact in <span className="text-primary italic">Numbers.</span>
          </h2>
          <p className="text-base-content/50 text-lg font-medium">
            Bridging the gap between ambitious students and world-class
            education through verified and trusted financial support.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <Motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2.5rem] bg-base-100 border border-base-200 shadow-xl shadow-base-content/5 hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500`}
              >
                <div className={`${stat.color.replace("bg-", "text-")}`}>
                  {stat.icon}
                </div>
              </div>

              {/* Value & Title */}
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-base-content tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-lg font-bold text-base-content/80 group-hover:text-primary transition-colors">
                  {stat.title}
                </p>
                <p className="text-sm text-base-content/40 leading-relaxed font-medium">
                  {stat.desc}
                </p>
              </div>

              {/* Hover Line Decoration */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-1/3 transition-all duration-500" />
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
