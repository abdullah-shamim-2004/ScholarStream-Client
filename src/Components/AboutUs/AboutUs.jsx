import React from "react";
import {
  FaGraduationCap,
  FaGlobeAsia,
  FaRegLightbulb,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-base-100 overflow-hidden">
      {/* --- Hero Section --- */}
      <section className="relative py-24 px-6 md:px-16 lg:px-32 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8"
        >
          Our Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-base-content tracking-tighter mb-8 max-w-4xl"
        >
          Democratizing <span className="text-primary italic">Global</span>{" "}
          Education.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base-content/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
        >
          ScholarStream is more than a platform—it's a gateway. We make
          scholarships accessible, transparent, and seamless for every ambitious
          student worldwide.
        </motion.p>
      </section>

      {/* --- Mission Section --- */}
      <section className="px-6 md:px-16 lg:px-32 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-base-content leading-tight">
              A Mission to Remove <br />
              <span className="text-primary underline decoration-primary/20 underline-offset-8">
                Financial Barriers.
              </span>
            </h2>
            <p className="text-base-content/70 leading-relaxed text-lg font-medium">
              ScholarStream was founded with one simple goal: to make global
              scholarship opportunities available to everyone — regardless of
              geography or background.
            </p>
            <p className="text-base-content/70 leading-relaxed">
              From fully funded degrees to specialized research grants, we
              provide verified, high-impact opportunities that help students
              focus on learning, not funding.
            </p>
            <div className="pt-4">
              <div className="flex gap-10">
                <div>
                  <h4 className="text-3xl font-black text-primary">10K+</h4>
                  <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">
                    Users Helped
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-primary">500+</h4>
                  <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">
                    Scholarships
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl -z-10" />
            <img
              src="https://images.pexels.com/photos/3184713/pexels-photo-3184713.jpeg"
              alt="Collaboration"
              className="rounded-[2rem] shadow-2xl object-cover aspect-video lg:aspect-square"
            />
          </motion.div>
        </div>
      </section>

      {/* --- Core Values --- */}
      <section className="py-24 bg-base-200/50">
        <div className="px-6 md:px-16 lg:px-32 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter mb-16">
            The Values That <span className="text-primary">Drive Us.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaGraduationCap />,
                title: "Education for All",
                desc: "Every student deserves a shot at greatness regardless of their economy.",
              },
              {
                icon: <FaGlobeAsia />,
                title: "Global Reach",
                desc: "Connecting talent from Asia, Europe, and beyond to world-class institutes.",
              },
              {
                icon: <FaRegLightbulb />,
                title: "Absolute Transparency",
                desc: "No hidden agendas. Only verified and updated data you can trust.",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-base-100 border border-base-300 shadow-xl shadow-base-content/5 flex flex-col items-center group transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                  {value.icon}
                </div>
                <h3 className="text-xl font-black mb-3">{value.title}</h3>
                <p className="text-base-content/50 leading-relaxed font-medium text-sm">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="px-6 md:px-16 lg:px-32 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter mb-16">
          Meet the{" "}
          <span className="text-primary text-opacity-40 font-medium italic underline underline-offset-4 decoration-primary/20">
            Visionaries.
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
              name: "Abdullah Shamim",
              role: "Founder & CEO",
            },
            {
              img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
              name: "Sarah Williams",
              role: "Scholarship Expert",
            },
            {
              img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
              name: "Michael Johnson",
              role: "Student Support",
            },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] mb-6 aspect-square grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
              </div>
              <h3 className="text-2xl font-black text-base-content tracking-tight">
                {member.name}
              </h3>
              <p className="text-base-content/40 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="px-6 md:px-16 lg:px-32 pb-24">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-primary p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden group shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] shadow-primary/30"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />

          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter relative z-10">
            Ready to shape your future?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg font-medium relative z-10">
            Your dream scholarship is just a click away. Join thousands of
            students who found their destiny with ScholarStream.
          </p>

          <Link
            to="/scholarships"
            className="btn btn-lg bg-white border-none text-primary hover:bg-base-200 rounded-2xl px-12 font-black shadow-xl shadow-black/10 relative z-10 group"
          >
            Explore Now{" "}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
