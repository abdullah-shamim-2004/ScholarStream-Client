import axios from "axios";
import { useEffect, useState } from "react";

const SuccessStories = () => {
  const [storys, setStory] = useState([]);
//   console.log(storys);

  useEffect(() => {
    axios("../success-story.json").then((res) => setStory(res.data));
  }, []);
  return (
    <section className="py-16 bg-base-300 mt-5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          🎓 Success Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {storys.map((story) => (
            <div
              key={story.id}
              className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-2xl"
            >
              <img
                src={story.image}
                alt="student"
                className="w-20 h-20 mx-auto rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg">{story.name}</h3>
              <p className="text-sm text-gray-500">{story.university}</p>
              <p className="mt-4 text-gray-600">{story.message}</p>
              <p className="mt-3">⭐⭐⭐⭐⭐</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
