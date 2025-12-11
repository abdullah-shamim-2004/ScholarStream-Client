import React from "react";
import {
  FaGraduationCap,
  FaUsers,
  FaGlobeAsia,
  FaRegLightbulb,
} from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="px-5 md:px-16 lg:px-32 py-14">
      {/* Header Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          About ScholarStream
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Empowering students worldwide by making scholarships accessible,
          transparent, and easier to apply for. Our mission is to help every
          student achieve their dreams.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-neutral">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            ScholarStream was founded with one simple goal: to make global
            scholarship opportunities available to everyone — no matter where
            they live, how much they know, or what their background is.
            <br />
            <br />
            From fully funded scholarships to research grants, we bring
            verified, updated opportunities to students who want to build a
            better future.
          </p>
        </div>

        <img
          src="https://images.pexels.com/photos/3184713/pexels-photo-3184713.jpeg"
          alt="Students collaboration"
          className="rounded-xl shadow-lg"
        />
      </section>

      {/* Our Values */}
      <section className="text-center mb-20">
        <h2 className="text-3xl font-bold text-neutral mb-10">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Value 1 */}
          <div className="p-6 rounded-xl shadow hover:shadow-xl transition bg-base-200">
            <FaGraduationCap className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Education for All</h3>
            <p className="text-gray-600">
              We believe every student deserves a chance to grow through global
              opportunities.
            </p>
          </div>

          {/* Value 2 */}
          <div className="p-6 rounded-xl shadow hover:shadow-xl transition bg-base-200">
            <FaGlobeAsia className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              From Asia to Europe to the Americas — we bring worldwide
              scholarships to your screen.
            </p>
          </div>

          {/* Value 3 */}
          <div className="p-6 rounded-xl shadow hover:shadow-xl transition bg-base-200">
            <FaRegLightbulb className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">
              We ensure all scholarship information is accurate, trusted, and
              updated.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center mb-20">
        <h2 className="text-3xl font-bold text-neutral mb-10">Meet Our Team</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Person 1 */}
          <div className="p-6 rounded-xl shadow bg-base-200">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Abdullah Shamim</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>

          {/* Person 2 */}
          <div className="p-6 rounded-xl shadow bg-base-200">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Sarah Williams</h3>
            <p className="text-gray-600">Scholarship Expert</p>
          </div>

          {/* Person 3 */}
          <div className="p-6 rounded-xl shadow bg-base-200">
            <img
              src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Michael Johnson</h3>
            <p className="text-gray-600">Student Support Lead</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Start exploring scholarships and take the first step towards shaping
          your future.
        </p>

        <Link
          to="/scholarships"
          className="btn btn-primary px-8 text-white font-bold"
        >
          Explore Scholarships
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
