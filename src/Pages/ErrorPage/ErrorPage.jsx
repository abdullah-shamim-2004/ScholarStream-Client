import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div
      className="relative md:w-[80vw] mx-auto h-[80vh] bg-full bg-center rounded-xl overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/kVtdQTvT/Lucid-Origin-404-error-page-illustration-with-a-confused-stude-3.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Oops! Page Not Found
        </h1>

        <p className="text-lg mb-6 max-w-md">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="btn bg-primary text-white px-6 hover:bg-primary/90"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
