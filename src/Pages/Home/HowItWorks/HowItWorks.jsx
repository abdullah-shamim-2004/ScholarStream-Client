import React from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaUserCheck,
  FaPaperPlane,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router";

const steps = [
  {
    id: 1,
    title: "Explore Scholarships",
    desc: "Browse through hundreds of verified global scholarships tailored to your needs.",
    icon: <FaSearch />,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Create Profile",
    desc: "Sign up and complete your profile to get personalized recommendations.",
    icon: <FaUserCheck />,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Apply Securely",
    desc: "Submit your application directly through our portal with just a few clicks.",
    icon: <FaPaperPlane />,
    color: "bg-emerald-500",
  },
  {
    id: 4,
    title: "Track Status",
    desc: "Monitor your application progress in real-time from your dashboard.",
    icon: <FaChartLine />,
    color: "bg-amber-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="apply" className="py-24 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tighter mb-6">
            Your Journey in{" "}
            <span className="text-primary ">4 Simple Steps.</span>
          </h2>
          <p className="text-base-content/50 font-medium text-lg">
            We’ve simplified the scholarship application process so you can
            focus on your studies.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed bg-base-300 -translate-y-1/2 z-0 opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group text-center"
                whileHover={{ y: -5 }}
              >
                {/* Icon Circle */}
                <div className="relative mb-8 flex justify-center">
                  <div
                    className={`w-20 h-20 rounded-3xl ${step.color} bg-opacity-10 flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-transparent transition-all`}
                  >
                    {/* আইকন রেন্ডারিং */}
                    <div className={step.textColor}>
                      {" "}
                      {/* এখানে সরাসরি কালার ক্লাসটি ব্যবহার করুন */}
                      {step.icon}
                    </div>
                  </div>
                  {/* Step Number Badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 md:right-1/4 w-8 h-8 rounded-full bg-base-100 border-4 border-base-200 flex items-center justify-center text-xs font-black"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {step.id}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.h3
                  className="text-xl font-black text-base-content mb-3 tracking-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-base-content/50 leading-relaxed font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {step.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 text-center">
          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg rounded-2xl px-12 text-white font-black shadow-xl shadow-primary/30 inline-flex items-center"
          >
            Get Started Now
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
