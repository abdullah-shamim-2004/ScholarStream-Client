import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-4 py-8 mt-16">
      <div className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 rounded-lg mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-3">
            🎓 Scholar<span className="text-primary">Stream</span>
          </h2>
          <p className="text-sm text-gray-300">
            Discover scholarships worldwide, apply easily, and build your
            academic future with confidence.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-lg">
            <a href="https://www.facebook.com/" className="hover:text-primary">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="https://x.com/" className="hover:text-primary">
              <FaXTwitter />
            </a>
            <a
              href="mailto:contact@scholarhub.com"
              className="hover:text-primary"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h6 className="footer-title text-primary">Explore</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/all-scholarships" className="link link-hover">
            All Scholarships
          </Link>
          <Link to="/" className="link link-hover">
            Top Scholarships
          </Link>
          <Link to="/" className="link link-hover">
            Study by Country
          </Link>
        </div>

        {/* Resources */}
        <div>
          <h6 className="footer-title text-primary">Resources</h6>
          <Link to="/" className="link link-hover">
            How to Apply
          </Link>
          <Link to="/" className="link link-hover">
            Scholarship Guides
          </Link>
          <Link to="/dashboard/my-applications" className="link link-hover">
            My Applications
          </Link>
          <Link to="/faq" className="link link-hover">
            FAQ
          </Link>
        </div>

        {/* Legal */}
        <div>
          <h6 className="footer-title text-primary">Legal</h6>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Refund Policy</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-500 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ScholarStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
