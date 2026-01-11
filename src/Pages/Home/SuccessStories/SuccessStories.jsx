import axios from "axios";
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const SuccessStories = () => {
  const [storys, setStory] = useState([]);

  useEffect(() => {
    axios("../success-story.json").then((res) => setStory(res.data));
  }, []);

  return (
    <section className="py-20 bg-base-200/50 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-base-content mb-4"
          >
            <span className="text-primary">Success</span> Stories
          </Motion.h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-base-content/70">
            Insparation story of the student.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storys.map((story, index) => (
            <Motion.div
              key={story.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300 hover:border-primary/30 transition-all"
            >
              {/* Quote Icon Overlay */}
              <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <FaQuoteLeft size={40} />
              </div>

              {/* Profile Section */}
              <div className="flex flex-col items-center">
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-primary to-secondary mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-base-100"
                  />
                </div>

                <h3 className="font-bold text-xl text-base-content">
                  {story.name}
                </h3>
                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">
                  {story.university}
                </p>
              </div>

              {/* Message */}
              <div className="relative mt-2">
                <p className="text-base-content/80 text-center italic leading-relaxed line-clamp-4">
                  "{story.message}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex justify-center mt-6 gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
