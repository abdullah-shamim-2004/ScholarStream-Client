import axios from "axios";
import { useEffect, useState } from "react";

const FAQ = () => {
  const [FAQ, setFAQ] = useState([]);
  //   console.log(FAQ);

  useEffect(() => {
    axios("../faq.json").then((res) => setFAQ(res.data));
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          ❓ Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {FAQ.map((ques) => (
            <div
              key={ques.id}
              className="collapse collapse-arrow bg-base-200 rounded-xl"
            >
              <input type="checkbox" />
              <div className="collapse-title font-medium">{ques.question}</div>
              <div className="collapse-content text-gray-600">
                {ques.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
