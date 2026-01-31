import axios from "axios";
import { useEffect, useState } from "react";
import { FaQuestionCircle, FaChevronRight, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios("../faq.json")
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="faq" className="py-24 bg-base-200/30 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <FaQuestionCircle className="text-sm" /> Help Center
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter mb-6">
            Common <span className="text-primary">Inquiries.</span>
          </h2>

          <p className="text-base-content/50 font-medium max-w-lg mx-auto leading-relaxed">
            Everything you need to know about the scholarship process and our
            platform's ecosystem.
          </p>
        </div>

        {/* --- FAQ Accordion List --- */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
                Loading Knowledge Base
              </p>
            </div>
          ) : (
            faqs.map((ques, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                key={ques.id || index}
                className="group"
              >
                <div className="collapse collapse-plus bg-base-100 border border-base-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 rounded-[2rem] transition-all duration-500">
                  <input type="checkbox" className="peer" />

                  {/* Question Title */}
                  <div className="collapse-title flex items-center gap-5 text-lg font-bold text-base-content group-hover:text-primary transition-colors peer-checked:text-primary py-6 px-8">
                    <span className="flex-none w-10 h-10 rounded-2xl bg-base-200 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-sm font-black transition-all duration-300 shadow-inner">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {ques.question}
                  </div>

                  {/* Answer Content */}
                  <div className="collapse-content px-8 md:px-24">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-base-300 to-transparent mb-6"></div>
                    <p className="text-base-content/60 leading-relaxed font-medium pb-4">
                      {ques.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* --- Post-FAQ Support Card --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 bg-base-100 rounded-[3rem] border border-base-300 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Subtle Background Icon */}
          <FaHeadset className="absolute -left-10 -bottom-10 text-[12rem] text-base-content/[0.02] -rotate-12" />

          <div className="text-center md:text-left relative z-10">
            <h4 className="text-2xl font-black mb-2 tracking-tight">
              Still have questions?
            </h4>
            <p className="text-base-content/50 font-medium">
              Can't find the answer you're looking for? Reach out to us.
            </p>
          </div>

          <button className="btn btn-primary btn-lg rounded-2xl px-10 text-white font-black shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all relative z-10">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
